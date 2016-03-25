/**
 * Created by vladthelittleone on 23.12.15.
 */
var app = angular.module('spacecraft.lessonBoard', []);

app.directive('lessonBoard', ['$sce', 'audioManager', function ($sce, audioManager)
{
	var link = function ($scope)
	{
		var audio;
		var char =  $scope.lesson.character;
		var i = 0;

		$scope.audioPause = false;
		$scope.textContent = false;
		$scope.hint = false;

		function tryShowHint (char, callback)
		{
			var hint = char.hint;

			if (hint)
			{
				var enjoyHint = new EnjoyHint(
				{
					onEnd: function ()
					{
						enjoyHint = null;
						if (char.waitForHint)
						{
							audio.onended = callback;
						}
					}
				});

				enjoyHint.set(hint);
				enjoyHint.run();

				if (!char.waitForHint)
				{
					audio.onended = function ()
					{
						enjoyHint && enjoyHint.trigger("skip");
						callback && callback();
					}
				}
			}
			else
			{
				audio.onended = callback;
			}
		}

		function previous()
		{
			$scope.audioPause = false;
			i = Math.max(i - 2, 0);
			next();
		}

		function next()
		{
			var ch = $scope.char = char[i];

			if (ch)
			{
				audio = audioManager.create(ch.audio);
				audio.play();
				$scope.audioPause = false;

				tryShowHint(ch, function ()
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

		$scope.getHint = function ()
		{
			if ($scope.lesson.hint)
			{
				return $sce.trustAsHtml($scope.lesson.hint);
			}
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

		$scope.showHint = function ()
		{
			$scope.hint = !$scope.hint;
		};

		$scope.$watch('lesson', function ()
		{
			char =  $scope.lesson.character;
			i = 0;
			next();
			$scope.textContent = false;
		})
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
