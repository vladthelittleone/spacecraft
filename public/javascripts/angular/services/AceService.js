/**
 * Created by Ivan on 09.05.2016.
 */

'use strict';

var app = angular.module('spacecraft.aceService', []);

app.factory('aceService', ['autocompleter', function (autocompleter)
{
	function setCodeAndAddScroll (editor, editorSession, code)
	{
		editor.$blockScrolling = Infinity;
		editorSession.setValue(code);

		// Скролл до конца. Т.е. скролл есть всегда.
		editor.setOption("scrollPastEnd", true);
	}

	function autocompleteAndLanguageTools (editor)
	{
		var langTools = ace.require('ace/ext/language_tools');
		var spaceCraftCompleter = autocompleter(editor);

		editor.completers = [spaceCraftCompleter];
		editor.setOptions(
		{
			enableSnippets: false,
			enableBasicAutocompletion: true
		});

		langTools.addCompleter(spaceCraftCompleter);
	}

	var initializeAceSettings  = function (editor, code)
	{
		var editorSession = editor.getSession();

		setCodeAndAddScroll(editor, editorSession, code);
		autocompleteAndLanguageTools(editor);
	};

	return{
		initializeAceSettings: initializeAceSettings
	};
}]);
