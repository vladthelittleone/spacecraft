/**
 * Created by vladthelittleone on 10.11.15.
 */
angular.module('spacecraft.tipsAndTricks', [])
    .directive('tipsAndTricks', ['$sce', function ($sce)
    {
        var link = function (scope)
        {
            var index = 0;
            var open = false;

            var array = [
                {
                    title: "Приветствуем вас!",
                    description: "<p class='text-indent'>Это краткий экскурс в наш сервис</p>"
                    + "<img src='resources/assets/images/logo.png'>"
                    + "<p>Мы раскажем вам о рабочем месте капитана, об основных функциях корабля и интерфейсе.</p>"
                    + "<p>Для продолжения нажмите <i class='glyphicon glyphicon-chevron-right'></i>.</p>"
                    + "<p>Для возврата на предыдущий слайд нажмите <i class='glyphicon glyphicon-chevron-left'></i>.</p>"
                },
                {
                    title: "Предесловие от авторов",
                    description: "<p class='text-indent'>Цели, которые мы преследуем, создавая этот проект, интерактивное обучение людей, которым интересно программирование, и создание игровой площадки для более опытных it-специалистов.</p>"
                    + "<div class='img-medium-center'>"
                    + "<img src='resources/assets/images/gamePlay1.png'>"
                    + "</div> "
                },
                {
                    title: "Текущая стадия",
                    description: "<p class='text-indent'>Текущий функционал далек от совершенства (сейчас перед вами первый прототип), но мы упорно работаем над проектом и надеемся реализовать все наши идеи и задумки.</p>"
                    + "<div class='img-small-center'>"
                    + "<a href='https://vk.com/spacecrafter' target='_blank'>"
                    + "<img src='resources/assets/images/astronaut6.png'>"
                    + "</a>"
                    + "</div> "
                    + "<p class='text-center'>Будем очень рады вашим отзывам и предложениям :)</p>"
                },
                {
                    title: "Редактор кода",
                    description: "<p>Редактор кода находится в правой части.</p>"
                    + "<div class='img-medium-center'>"
                    + "<img src='resources/assets/images/gamePlay2.png'>"
                    + "</div>"
                    + "<p>Вы можете убрать редактор кода нажав на <i class='glyphicon glyphicon-chevron-up'></i> в верхнем правом углу</p>"
                    + "<p>Для запуска кода нажмите на <i class='glyphicon glyphicon-play green'></i></p>"
                    + "<p>Для остановки кода нажмите на <i class='glyphicon glyphicon-stop red'></i></p>"
                }
            ];

            scope.next = function ()
            {
                index = (index + 1) % array.length;
            };

            scope.previous = function ()
            {
                index = index ? (index - 1) % array.length : array.length - 1;
            };

            scope.getContentTitle = function ()
            {
                return $sce.trustAsHtml(array[index].title);
            };

            scope.getContentDescription = function ()
            {
                return $sce.trustAsHtml(array[index].description);
            };

            scope.$watch('open', function (o)
            {
                open = o;
            });
        };

        return {
            scope: {
                open: '='
            },
            templateUrl: 'views/tips-and-tricks.html',
            link: link
        };
    }]);
