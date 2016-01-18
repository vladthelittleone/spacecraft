/**
 * Created by Ivan on 18.01.2016.
 */
app.directive('ng-repeat-finished', function ()
{
	return function (scope)
	{
		console.log("dddddd");
		if (scope.$last) setTimeout(function ()
		{
			console.log("ggggg");
			scope.$emit('ngRepeatFinished');
		},1);
	}
});
