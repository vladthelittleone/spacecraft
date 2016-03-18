/**
 * Created by vladthelittleone on 23.12.15.
 */
var app = angular.module('spacecraft.lessonBoard', []);

app.directive('lessonBoard', ['$sce', function ($sce)
{
	var link = function ($scope)
	{
		var audio;
		var char = $scope.lesson.character;
		var i = 0;

		$scope.audioPause = false;
		$scope.textContent = false;

		function tryShowHint (char, callback)
		{
			var hint = char.hint;

			if (hint)
			{
				var enjoyHint = new EnjoyHint(
				{
					onEnd: function ()
					{
						if (char.waitForHint)
						{
							audio.onended = function ()
							{
								callback && callback();
							}
						}
					}
				});

				if ($scope.lesson.hint)
				{
					enjoyHint.set(hint);
					enjoyHint.run();
				}

				if (!char.waitForHint)
				{
					audio.onended = function ()
					{
						enjoyHint.trigger("skip");
						callback && callback();
					}
				}
			}
			else
			{
				audio.onended = function()
				{
					callback && callback();
				}
			}
		}

		function previous()
		{
			i = Math.max(i - 2, 0);
			next();
		}

		function next()
		{
			if (char[i])
			{
				audio = new Audio(char[i].audio);
				audio.play();

				tryShowHint(char[i], function ()
				{
					$scope.audioPause = true;
					i++;
					next();
					$scope.$apply();
				});
			}
		}

		next();

		$scope.toggleTextContent = function ()
		{
			$scope.textContent = !$scope.textContent;
		};

		$scope.getContent = function ()
		{
			return $sce.trustAsHtml($scope.lesson.content());
		};

		$scope.getInstructions = function ()
		{
			return $sce.trustAsHtml($scope.lesson.instructions);
		};

		$scope.togglePauseAudio = function ()
		{
			if ($scope.audioPause)
			{
				audio.play();
			}
			else
			{
				audio.pause();
			}

			$scope.audioPause = !$scope.audioPause;
		};

		$scope.previousAudio = function ()
		{

			if (audio.currentTime / 5 < 1)
			{
				audio.pause();
				audio.currentTime = 0;
				previous();
			}
			else
			{
				audio.currentTime = 0;
			}
		};
	};

	return {
		scope:
		{
			lesson: '=',
			text: '=',
			quote: '='
		},
		templateUrl: 'views/directives/lesson-board.html',
		link: link
	};
}]);
