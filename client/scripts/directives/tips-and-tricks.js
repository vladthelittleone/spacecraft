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
                    description: "<p>Это краткий экскурс в наш сервис</p>"
                    + "<img src='resources/assets/images/logo.png'>"
                    + "<p>Мы раскажем вам о рабочем месте капитана, об основных функциях корабля и интерфейсе.</p>"
                    + "<p>Для продолжения нажмите <i class='glyphicon glyphicon-chevron-right'></i>.</p>"
                    + "<p>Для возврата на предыдущий слайд нажмите <i class='glyphicon glyphicon-chevron-left'></i>.</p>"
                },
                {
                    title: "Предесловие от авторов",
                    description: "<p>Цели, которые мы преследуем, создавая этот проект, интерактивное обучение людей, которым интересно программирование, и создание игровой площадки для более опытных it-специалистов.</p>"
                    + "<div class='img-medium-center'>"
                    + "<img src='resources/assets/images/gamePlay1.png'>"
                    + "</div> "
                },
                {
                    title: "Текущая стадия",
                    description: "<p>Текущий функционал далек от совершенства (сейчас перед вами первый прототип), но мы упорно работаем над проектом и надеемся реализовать все наши идеи и задумки.</p>"
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
                },
                {
                    title: "Документация",
                    description: "<p>Документация содержит информацию о всех функциях и объектах игры.</p>"
                    + "<div class='img-medium-center'>"
                    + "<img src='resources/assets/images/gamePlay3.png'>"
                    + "</div>"
                    + "<p>Нажмите на <i class='glyphicon glyphicon-question-sign'></i> для получения документации.</p>"
                },
                {
                    title: "Отзывы и предложения",
                    description: "<p>Хотите оставить отзыв или предложение?</p>"
                    + "<div class='img-small-center'>"
                    + "<img src='resources/assets/images/spacecraft2.png'>"
                    + "</div> "
                    + "<p>Нажмите <i class='glyphicon glyphicon-comment'></i>.</p>"
                    + "<p>Либо отпишитесь в обсуждениях <a href='https://vk.com/spacecrafter'>группы в вконтакте</a>.</p>"
                },
                {
                    title: "Отзывы и предложения",
                    description: "<p>Хотите оставить отзыв или предложение?</p>"
                    + "<div class='img-small-center'>"
                    + "<img src='resources/assets/images/spacecraft2.png'>"
                    + "</div> "
                    + "<p>Нажмите <i class='glyphicon glyphicon-comment'></i>.</p>"
                    + "<p>Либо отпишитесь в обсуждениях <a href='https://vk.com/spacecrafter'>группы в вконтакте</a>.</p>"
                },
                {
                    title: "Пример кода",
                    description: "<p>Метод run() запускается системой, в нем вы можете изменять корабль.</p>"
                    + "<div class='img-huge-center'>"
                    + "<img src='resources/assets/images/code1.png'>"
                    + "</div> "
                    + "<p>Параметр i сохраняет свое значение для каждого вызова run().</p>"
                },
                {
                    title: "Метод run(spaceCraft, world)",
                    description: "<p>В метод <b>run(spaceCraft, world)</b> передаются два параметра spaceCraft и world:</p>"
                    + "<div class='img-huge-center'>"
                    + "<img src='resources/assets/images/code2.png'>"
                    + "</div> "
                    + "<p><b>spaceCraft</b> - отвечает за управление кораблем.</p>"
                    + "<p><b>world</b> - отвечает за получение информации о объектах мира и самом мире.</p>"
                    + "<p>Информацию о них вы можете посмотреть в документации, нажав <i class='glyphicon glyphicon-question-sign'></i>.</p>"
                },
                {
                    title: "Параметры корабля",
                    description: "<p>Вы можете получить текущие параметра корабля с помощью методов:</p>"
                    + "<p><i class='glyphicon glyphicon-heart red'></i> <b>getHealth()</b> - получить текущее здоровье корабля.</p>"
                    + "<p><i class='glyphicon glyphicon-screenshot green'></i> <b>getDamage()</b> - получить текущий урон оружия корабля. </p>"
                    + "<p><i class='glyphicon glyphicon-adjust blue'></i> <b>getShield()</b> - получить текущие щиты корабля.</p>"
                    + "<p>Информацию о них вы можете посмотреть в документации, нажав <i class='glyphicon glyphicon-question-sign'></i>.</p>"
                },
                {
                    title: "Параметры корабля",
                    description: "<p>Вы можете получить текущие параметра корабля с помощью методов:</p>"
                    + "<p><i class='glyphicon glyphicon-heart red'></i> <b>getHealth()</b> - получить текущее здоровье корабля.</p>"
                    + "<p><i class='glyphicon glyphicon-screenshot green'></i> <b>getDamage()</b> - получить текущий урон оружия корабля. </p>"
                    + "<p><i class='glyphicon glyphicon-adjust blue'></i> <b>getShield()</b> - получить текущие щиты корабля.</p>"
                    + "<p>Информацию о них вы можете посмотреть в документации, нажав <i class='glyphicon glyphicon-question-sign'></i>.</p>"
                },
                {
                    title: "Параметры корабля",
                    description: "<p>Вы можете получить текущие параметра корабля с помощью методов:</p>"
                    + "<p><i class='glyphicon glyphicon-heart red'></i> <b>getHealth()</b> - получить текущее здоровье корабля.</p>"
                    + "<p><i class='glyphicon glyphicon-screenshot green'></i> <b>getDamage()</b> - получить текущий урон оружия корабля. </p>"
                    + "<p><i class='glyphicon glyphicon-adjust blue'></i> <b>getShield()</b> - получить текущие щиты корабля.</p>"
                    + "<p>Информацию о них вы можете посмотреть в документации, нажав <i class='glyphicon glyphicon-question-sign'></i>.</p>"
                },
                {
                    title: "Отдельное спасибо",
                    description: "<p xmlns:cc='http://creativecommons.org/ns#' about='http://millionthvector.blogspot.ru/p/free-sprites.html'>За предоставленные спрайты от <a rel='cc:attributionURL' property='cc:attributionName' href='http://millionthvector.blogspot.com/p/free-sprites.html'>MillionthVector</a> / <a rel='license' href='http://creativecommons.org/licenses/by/4.0/'>CC BY 4.0</a></p>"
                    + "За иконки от <a href='http://ru.freepik.com'>Freepik</a>"
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
