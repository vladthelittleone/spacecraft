'use strict';

/**
 * Created by vladthelittleone on 21.10.15.
 */
var LessonGame = function (spec)
{
	var that = {};
	var lessonId = spec.lessonId;

	switch (parseInt(lessonId))
	{
		case 0:
			that = LessonGameInit0(spec);
			break;
	}


	that.initParams();
	that.initStates();

	return that;
};
