/**
 * Created by vladthelittleone on 02.11.15.
 */

tutorial =
{
    world:
    {
        title: "World",
        description: "Объект, отвечающий за информацию о мире, его объектах (врагах, бонусах)",
        functions:
        [
            {
                name: "getEnemies(callback)",
                description:
                [
                    "Функция возвращает массив всех врагов мира. Смотрите объект Enemy.",
                    "Параметр callback - функция с параметрами (e - вражеский космический корабль, i - индекс, arr - массив), которая вызывается для каждого элемента массива. callback - не обязательный параметр."
                ]
            },
            {
                name: "getBonuses(callback)",
                description:
                [
                    "Функция возвращает массив всех бонусов мира. Смотрите объект Bonus.",
                    "Параметр callback - функция с параметрами (e - вражеский космический корабль, i - индекс, arr - массив), которая вызывается для каждого элемента массива. callback - не обязательный параметр."
                ]
            },
            {
                name: "getBounds()",
                description:
                [
                    "Функция возвращает границы мира мира.",
                    "Пример возвращаемого объекта: {x: 0, y: 0, width: 2000, height: 2000}"
                ]
            }
        ]
    },
    spaceCraft:
    {
        title: "SpaceCraft",
        description: "Объект управления космическим кораблем",
        functions:
        [
            {
                name: "weapon",
                description:
                [
                    "Вызов объекта weapon для выполнения действий с оружием.",
                    "Смотрите объект Weapon."
                ]
            },
            {
                name: "getHealth()",
                description: [
                    "Функция возвращает уровень здоровья вашего корабля в данный момент."
                ]
            },
            {
                name: "getShield()",
                description: [
                    "Функция возвращает уровень щитов вашего корабля в данный момент."
                ]
            },
            {
                name: "getX()",
                description:
                [
                    "Функция возвращает координату корабля по оси х."
                ]
            },
            {
                name: "getY()",
                description:
                [
                    "Функция возвращает координату корабля по оси y."
                ]
            },
            {
                name: "getAngle()",
                description:
                [
                    "Получение текущего угла космического корабля."
                ]
            },
            {
                name: "angleBetween(another)",
                description:
                [
                    "Возвращает угол между космическим кораблем и объектом (another)."
                ]
            },
            {
                name: "distance(another)",
                description:
                [
                    "Возвращает дистанцию от космического корабля до объекта (another)."
                ]
            },
            {
                name: "rotateLeft()",
                description:
                [
                    "Поворот влево космического корабля."
                ]
            },
            {
                name: "rotateRight()",
                description:
                [
                    "Поворот вправо корабля."
                ]
            },
            {
                name: "rotateTo(another)",
                description:
                [
                    "Поворот корабля к объекту (another)."
                ]
            },
            {
                name: "moveForward()",
                description:
                [
                    "Движение корабля вперед."
                ]
            },
            {
                name: "moveBackward()",
                description:
                [
                    "Движение корабля назад."
                ]
            },
            {
                name: "getId()",
                description:
                [
                    "Функция вовращает id космического корабля."
                ]
            }
        ]
    },
    weapon: {
        title: "Weapon",
        description: "Объект управления оружием космического корабля",
        functions:
        [
            {
                name: "getDamage()",
                description:
                [
                    "Функция возвращает урон, наносимый оружием."
                ]
            },
            {
                name: "getFireRate()",
                description:
                [
                    "Функция возвращает скорострельность оружия."
                ]
            },
            {
                name: "getFireRange()",
                description:
                [
                    "Фуникция возвращает радиус поражения оружия."
                ]
            },
            {
                name: "inRange(another)",
                description:
                [
                    "Проверяет объект another, на вхождение в радиус поражения оружия."
                ]
            },
            {
                name: "fire(obj1, obj2)",
                description:
                [
                    "Выполняет выстрел в заданную точку.",
                    "obj1, obj2 могут быть координатой, тогда вызов будет: spaceCraft.fire(100, 100).",
                    "obj1 может быть объектом (врагом например), тогда вызов будет: spaceCraft.fire(enemy).",
                    "Вы так же можете не задавать параметры: spaceCraft.fire(). Выстрел будет по направлению корабля."
                ]
            },
            {
                name: "enemiesInRange(callback)",
                description:
                    [
                        "Возвращает массив врагов в зоне поражения оружия.",
                        "Параметр callback - функция с параметрами (e - вражеский космический корабль, i - индекс, arr - массив), которая вызывается для каждого элемента массива. callback - не обязательный параметр."

                    ]
            }
        ]
    },
    bonus: {
        title: "Bonus",
        description: "Объект обломков уничтоженного корабля (Бонус)",
        functions:
        [
            {
                name: "getX()",
                description:
                [
                    "Функция возвращает координату обломков по оси х."
                ]
            },
            {
                name: "getY()",
                description:
                [
                    "Функция возвращает координату обломков по оси y."
                ]
            },
            {
                name: "getType()",
                description:
                [
                    "Функция возвращает тип бонуса. Всего их три:",
                    "Увеличение здоровья: health",
                    "Увеличение щита: shield",
                    "Увеличение урона оружия: damage",
                    "К примеру: bonus.getType() === 'damage'"
                ]
            },
            {
                name: "getId()",
                description:
                [
                    "Функция вовращает id обломков."
                ]
            }
        ]
    },
    enemy:
    {
        title: "Enemy",
        description: "Объект, отвечающий за информацию о вражеском корабле",
        functions:
        [
            {
                name: "weapon",
                description:
                    [
                        "Вызов объекта weapon для получение информации об оружии врага.",
                        "Смотрите объект EnemyWeapon."
                    ]
            },
            {
                name: "getHealth()",
                description:
                [
                    "Функция возвращает уровень здоровья вражеского корабля в данный момент."
                ]
            },
            {
                name: "getShield()",
                description:
                [
                    "Функция возвращает уровень щитов вашего корабля в данный момент."
                ]
            },
            {
                name: "getX()",
                description:
                [
                    "Функция возвращает координату корабля по оси х."
                ]
            },
            {
                name: "getY()",
                description:
                [
                    "Функция возвращает координату корабля по оси y."
                ]
            },
            {
                name: "getAngle()",
                description:
                [
                    "Получение текущего угла космического корабля."
                ]
            },
            {
                name: "angleBetween(another)",
                description:
                [
                    "Возвращает угол между космическим кораблем и объектом (another)."
                ]
            },
            {
                name: "distance(another)",
                description:
                [
                    "Возвращает дистанцию от космического корабля до объекта (another)."
                ]
            },
            {
                name: "getId()",
                description:
                [
                    "Функция вовращает id космического корабля."
                ]
            }
        ]
    },
    enemyWeapon:
    {
        title: "EnemyWeapon",
        description: "Объект, отвечающий за информацию о оружии вражеского корабля",
        functions:
        [
            {
                name: "getDamage()",
                description:
                [
                    "Функция возвращает урон, наносимый оружием."
                ]
            },
            {
                name: "getFireRate()",
                description:
                [
                    "Функция возвращает скорострельность оружия."
                ]
            },
            {
                name: "getFireRange()",
                description:
                [
                    "Фуникция возвращает радиус поражения оружия."
                ]
            },
            {
                name: "inRange(another)",
                description:
                [
                    "Проверяет объект another, на вхождение в радиус поражения оружия."
                ]
            },
            {
                name: "enemiesInRange(callback)",
                description:
                [
                    "Возвращает массив врагов в зоне поражения оружия.",
                    "Параметр callback - функция с параметрами (e - вражеский космический корабль, i - индекс, arr - массив), которая вызывается для каждого элемента массива. callback - не обязательный параметр."

                ]
            }
        ]
    }
};
