/* vim:set ts=2 sw=2 sts=2 expandtab */
/*jshint undef: true es5: true node: true devel: true
         forin: true, eqnull: true supernew: true  */
/*global define: true */

(typeof define === "undefined" ? function ($) { $(require, exports, module); } : define)(function (require, exports, module, undefined) {

"use strict";

var GModel = require("../models").Model;
var lastRequest;
var toArray = Function.prototype.call.bind(Array.prototype.slice);

function isFunction(value) {
  return typeof value === "function";
}
function getUrl(target) {
  return !target ? undefined : isFunction(target.url) ? target.url() : target.url;
}
function normalizeURL(url) {
  return url + (url[url.length - 1] === '/' ? '' : '/');
}
// Stub out request...
function sync() { lastRequest = toArray(arguments); }

var attrs = {
  id     : '1-the-tempest',
  title  : "The Tempest",
  author : "Bill Shakespeare",
  length : 123
};

var BModel = GModel.extend({
  url: function url() {
    var base = getUrl(this.collection) || this.urlRoot;
    return this.isNew() ? base :
           normalizeURL(base) + encodeURIComponent(this.id);
  }
});
BModel.sync = sync;

var Proxy = BModel.extend();
var doc = new Proxy(attrs);

var klass = GModel.extend({
  url : function() { return '/collection'; }
});

var Collection = klass.extend({
  add: function add(model) {
    if (!model.collection)
      model.collection = this;
  }
});
var collection = new Collection;
collection.add(doc);

exports["test Model: initialize"] = function(assert) {
  var Model = GModel.extend({
    initialize: function() {
      this.one = 1;
      assert.equal(this.collection, collection,
                   "collection is set before initialize is called");
    }
  });
  var model = new Model({}, { collection: collection });
  assert.equal(model.one, 1, "initalize have set attribute `one`");
  assert.equal(model.collection, collection,
               "collection was set by constructor");
};

exports["test Model: initialize with attributes and options"] = function(assert) {
  var Model = GModel.extend({
    initialize: function(attributes, options) {
      this.one = options.one;
    }
  });
  var model = new Model({}, { one: 1 });
  assert.equal(model.one, 1, "initialize called with a constructor arguments");
};

exports["test Model: url"] = function(assert) {
  assert.equal(doc.url(), '/collection/1-the-tempest',
               "url takes collection and id into account");
  doc.collection.url = '/collection/';
  assert.equal(doc.url(), '/collection/1-the-tempest',
               "trailing `/` of collection is normalized");
  doc.collection = null;
  assert.throws(function() {
    doc.url();
  }, "exception is thrown when no root url is present");

  doc.urlRoot = '/';
  assert.equal(doc.url(), '/1-the-tempest',
               "fallback to urlRoot if property exists");

  delete doc.urlRoot;
  doc.collection = collection;
};


exports["test Model: url when using urlRoot, and uri encoding"] = function(assert) {
  var Model = BModel.extend({
    urlRoot: '/collection'
  });
  var model = new Model;
  assert.equal(model.url(), '/collection',
               "if has no id then parent url is used");
  model.set({ id: '+1+' });
  assert.equal(model.url(), '/collection/%2B1%2B',
               "url is properly escaped");
};


exports["test Model: clone"] = function(assert) {
  var attrs = { 'foo': 1, 'bar': 2, 'baz': 3};
  var a = new GModel(attrs);
  var b = a.clone();
  assert.equal(a.get('foo'), 1, "attribute `foo` was set");
  assert.equal(a.get('bar'), 2, "attribute `bar` was set");
  assert.equal(a.get('baz'), 3, "attribute `baz` was set");
  assert.equal(b.get('foo'), a.get('foo'), "Foo should be the same on the clone.");
  assert.equal(b.get('bar'), a.get('bar'), "Bar should be the same on the clone.");
  assert.equal(b.get('baz'), a.get('baz'), "Baz should be the same on the clone.");
  a.set({ foo : 100 });
  assert.equal(a.get('foo'), 100, "attribute has changed");
  assert.equal(b.get('foo'), 1, "Changing a parent attribute does not change the clone.");
};

exports["test Model: isNew"] = function(assert) {
  var attrs = { 'foo': 1, 'bar': 2, 'baz': 3 };
  var a = new GModel(attrs);
  assert.ok(a.isNew(), "it should be new");
  attrs = { 'foo': 1, 'bar': 2, 'baz': 3, 'id': -5 };
  assert.ok(a.isNew(), "any defined ID is legal, negative or positive");
};


exports["test Model: get"] = function(assert) {
  assert.equal(doc.get('title'), 'The Tempest', "correct 'title' attribute");
  assert.equal(doc.get('author'), 'Bill Shakespeare',
               "correct 'author' attribute");
  doc.unset("audience");
  assert.equal(doc.get('audience'), undefined, "property was unset");
};

exports["test Model: has"] = function(assert) {
  var attrs = {};
  var a = new GModel(attrs);
  assert.equal(a.has("name"), false, "attribute `name` is not set");
  [true, "Truth!", 1, false, '', 0].forEach(function(value) {
    a.set({ 'name': value });
    assert.equal(a.has("name"), true, "attribute `name` was set: " + value);
  });

  a.unset('name');
  assert.equal(a.has('name'), false, "attribute `name` was unset");

  [null, undefined].forEach(function(value) {
    a.set({ 'name': value });
    assert.equal(a.has("name"), false, "attribute `name` was not set");
  });
};

exports["test Model: set and unset"] = function(assert) {
  var attrs = { id: 'id', foo: 1, bar: 2, baz: 3 };
  var a = new GModel(attrs);
  var changeCount = 0;
  a.on("change:foo", function() { changeCount += 1; });
  a.set({ 'foo': 2 });
  assert.equal(a.get('foo'), 2, "Foo should have changed.");
  assert.equal(changeCount, 1, "Change count should have incremented.");
  a.set({ 'foo': 2 }); // set with value that is not new shouldn't fire change event
  assert.equal(a.get('foo'), 2, "Foo should NOT have changed, still 2");
  assert.equal(changeCount, 1, "Change count should NOT have incremented.");

  a.unset('foo');
  assert.equal(a.get('foo'), undefined, "Foo should have changed");
  assert.equal(changeCount, 2, "Change count should have incremented for unset.");

  a.unset('id');
  assert.equal(a.id, undefined, "Unsetting the id should remove the id property.");
};


exports["test Model: multiple unsets"] = function(assert) {
  var i = 0;
  var counter = function(){ i++; };
  var model = new GModel({ a: 1 });
  model.on("change:a", counter);
  model.set({ a: 2 });
  model.unset('a');
  model.unset('a');
  assert.equal(i, 2, 'Unset does not emit an event for missing attributes.');
};

exports["test Model: using a non-default id attribute."] = function(assert) {
  var MongoModel = GModel.extend({ '@' : '_id'});
  var model = new MongoModel({ id: 'eye-dee', _id: 25, title: 'Model' });
  assert.equal(model.get('id'), 'eye-dee', "id property was set correctly");
  assert.equal(model.id, 25, "id refers to the primary key which is _id");
  model.unset('_id');
  assert.equal(model.id, null, "id was unset as primary key was unset");
  assert.ok(model.isNew(), "model became new as it has no id");
};

exports["test Model: set an empty string"] = function(assert) {
  var model = new GModel({ name : "Model" });
  model.set({ name : '' });
  assert.equal(model.get('name'), '', "name attribute was set to ''");
};

exports["test Model: clear"] = function(assert) {
  var changed = false;
  var model = new GModel({ name : "Model" });
  model.on("change:name", function() { changed = true; });
  model.clear();
  assert.equal(changed, true, "clear emitted 'change' event");
  assert.equal(model.get('name'), undefined, "name was unset by clear");
  assert.equal(model.has('name'), false, "name is no longer set");
};

exports["test Model: defaults"] = function(assert) {
  var Defaulted = GModel.extend({
    defaults: {
      "one": 1,
      "two": 2
    }
  });
  var model = new Defaulted({ two: null });
  assert.equal(model.get('one'), 1, "default value is set");
  assert.equal(model.get('two'), null, "default value is overrided");
  Defaulted = GModel.extend({
    defaults: function() {
      return {
        "one": 3,
        "two": 4
      };
    }
  });
  model = new Defaulted({ two: null });
  assert.equal(model.get('one'), 3, "default value was received");
  assert.equal(model.get('two'), null, "default value was overided");
};

exports["test Model: change, hasChanged, changedAttributes, previous, previousAttributes"] = function(assert) {
  var model = new GModel({ name : "Tim", age : 10 });
  model.on('change', function(attributes) {
    assert.ok(attributes.name, 'name changed');
    assert.ok(!attributes.age, 'age did not');
    assert.equal(attributes.age.previous, "Tim", "previous value is passed");
    assert.equal(attributes.age.value, "Rob", "new value is passed");
  });
  model.set({ name : 'Rob' }, { silent : true });
  // TODO: Consider passing previous values.
  //assert.equal(model.hasChanged(), true);
  //assert.equal(model.hasChanged('name'), true);
  //model.change();
  assert.equal(model.get('name'), 'Rob', "property name was updated");
};

exports["test Model: change with options"] = function(assert) {
  var value;
  var model = new GModel({ name: 'Rob' });
  model.on('change', function(attributes, model, options) {
    value = options.prefix + model.get('name');
  });
  model.set({ name: 'Bob' }, { silent: true });
  // TODO: Consider adding `change` method to the model.
  // model.change({ prefix: 'Mr. ' });
  // assert.equal(value, 'Mr. Bob');
  model.set({ name: 'Sue' }, { prefix: 'Ms. ' });
  assert.equal(value, 'Ms. Sue', "options are passed to the listeners");
};

exports["test Model: change after initialize"] = function (assert) {
  var changed = 0;
  var attrs = { id: 1, label: 'c' };
  var obj = new GModel(attrs);
  obj.on('change', function() { changed += 1; });
  obj.set(attrs);
  assert.equal(changed, 0, "change is not emitted if values don't change");
};

exports["test Model: save within change event"] = function (assert) {
  var model = new GModel({ firstName : "Taylor", lastName: "Swift" });
  model.sync = sync;
  model.on('change', function () {
    model.save();
    assert.equal(lastRequest[1], model, 'sync is called with this model');
  });
  model.set({ lastName: 'Hicks' });
};

exports["test Model: save"] = function(assert) {
  doc.save({ title : "Henry V" });
  assert.equal(lastRequest[0], 'update', "as model was not new it's update");
  assert.equal(lastRequest[1], doc, "model was a target doc model");
};

exports["test Model: fetch"] = function(assert) {
  doc.fetch();
  assert.equal(lastRequest[0], 'read', "fetch triggers `read` on sync");
  assert.equal(lastRequest[1], doc, "module passed is target model");
};

exports["test Model: destroy"] = function(assert) {
  doc.destroy();
  assert.equal(lastRequest[0], 'delete', "sync was called with `delete`");
  assert.equal(lastRequest[1], doc, "model passed to sync was target model");
};

exports["test Model: validate"] = function(assert) {
  var lastError;
  var model = new BModel();
  model.validate = function(attrs) {
    if (attrs.admin) 
      throw new TypeError("Can't change admin status.");
    return attrs;
  };
  model.on('error', function(model, error) {
    lastError = error;
  });
  var result = model.set({ a: 100 });
  assert.equal(result, model, "set returns tagret model");
  assert.equal(model.get('a'), 100, "set changed value of `a`");
  assert.equal(lastError, undefined, "no error were dispatched");
  /* TODO: Consider silent errors

  result = model.set({ admin: true }, { silent: true });
  assert.equal(lastError, undefined);
  assert.equal(model.get('admin'), true);
  
  result = model.set({a: 200, admin: true});
  assert.equal(result, false);
  assert.equal(model.get('a'), 100);
  assert.equal(lastError, "Can't change admin status.");
  */
  assert.throws(function() {
    model.set({ a: 200, admin: true });
  }, /Can't change admin status/, "setting invalid attiributes throw");
  assert.equal(model.get('a'), 100, "valid attribute is not set either");
};

exports["test Model: validate on unset and clear"] = function(assert) {
  var model = new BModel({ name: "One" });
  model.validate = function(attrs) {
    if ("name" in attrs) {
      if (!attrs.name) {
        throw new TypeError("No thanks.");
      }
    }
    return attrs;
  };
  model.set({ name: "Two" });
  assert.equal(model.get('name'), 'Two', "new name was set");
  /* TODO: Consider validation on unset / clear.
  assert.throws(function() {
    model.unset('name');
  }, /No thanks/, "can not be unset to undefined");
  assert.equal(model.get('name'), 'Two', "name was not unset by unset");
  assert.throws(function() {
    model.clear();
  }, /No thanks/, "can not be cleared to undefinde");
  assert.equal(model.get('name'), 'Two', "name was not unset by clear");
  delete model.validate;
  */
  model.clear();
  assert.equal(model.get('name'), undefined, "name was unset to defualt");
};

exports["test Model: validate with error callback"] = function(assert) {
  var lastError, boundError;
  var model = new BModel();
  model.validate = function(attrs) {
    if (attrs.admin)
      throw new TypeError("Can't change admin status.");
    return attrs;
  };
  var callback = function(model, error) {
    lastError = error;
  };
  model.on('error', function(model, error) {
    boundError = true;
  });
  var result = model.set({ a: 100 }, { error: callback });
  assert.equal(result, model, "set returns target model");
  assert.equal(model.get('a'), 100, "get returns value that was set");
  assert.equal(lastError, undefined, "error back was not called");
  assert.equal(boundError, undefined, "error event was not emitted");
  assert.throws(function() {
    result = model.set({ a: 200, admin: true }, { error: callback });
  }, /admin status/, "setting invalid attributes throws");
  // TODO: Consider doing it backbone way instead.
  // assert.equal(result, false);
  assert.equal(model.get('a'), 100, "still previous value is set");
  // assert.equal(lastError, "Can't change admin status.");
  // assert.equal(boundError, undefined);
};

exports["test Model: Inherit class properties"] = function(assert) {
  var Parent = GModel.extend({
    instancePropSame: function() {},
    instancePropDiff: function() {}
  });
  Parent.classProp = function() {};

  var Child = Parent.extend({
    instancePropDiff: function() {}
  });

  var adult = new Parent;
  var kid   = new Child;

  assert.equal(Child.classProp, Parent.classProp, "decedent inherits statics");

  assert.equal(kid.instancePropSame, adult.instancePropSame,
               "decedent inherits prototype properties");

  assert.notEqual(kid.instancePropDiff, adult.instancePropDiff,
                  "decednet may override prototype properties");
};

if (module == require.main)
  require("test").run(exports);

});
