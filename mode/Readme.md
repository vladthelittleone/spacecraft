# models #

M form MVC

## Install ##

    npm install models

## Require ##

    var Model = require('https!raw.github.com/Gozala/models/v0.1.0/models.js').Model

## Usage ##

    var Model = require('https!raw.github.com/Gozala/models/v0.1.0/models.js').Model
    var Sidebar = Model.extend({
      promptColor: function(value) {
        this.set({ color: value });
      }
    })

    var sidebar = Sidebar({ color: 'white' })
    sidebar.on('change:color', function(event) {
      console.log('color is no longer ' + event.previous + ' it is ' + event.value)
    })
    sidebar.promptColor('red')

