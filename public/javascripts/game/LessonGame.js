'use strict';

/**
 * Created by vladthelittleone on 21.10.15.
 */
var LessonGame = function (spec)
{
	var lessonId = spec.lessonId;

	switch (parseInt(lessonId))
	{
		case 0:
		{
			spec.playState = LessonPlayState0;
			spec.loads =
			{
				'harvester': 'images/sprites/spaceCraft/harvester.png',
				'starField': 'images/sprites/starField.png',
				'shield': 'images/sprites/shield.png',
				'base': 'images/sprites/base/base.png',
				'meteor1': 'images/sprites/meteor/meteor1.png'
			};

			break;
		}
		case 1:
		{
			spec.playState = LessonPlayState1;
			spec.loads =
			{
				'fighter': 'images/sprites/spaceCraft/fighter.png',
				'starField': 'images/sprites/starField.png',
				'userShield': 'images/sprites/shield2.png',
				'base': 'images/sprites/base/base.png',
				'meteor1': 'images/sprites/meteor/meteor1.png'
			};

			break;
		}
	}

	var that = LessonGameInit(spec);

	that.initParams();
	that.initStates();

	return that;
};
