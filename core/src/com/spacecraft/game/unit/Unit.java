package com.spacecraft.game.unit;

import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.math.Vector2;


/**
 * Интерфейс юнита в игре.
 *
 * @author Makovchik Ivan
 * @since 14.06.15
 */
public interface Unit
{
     /**
      * Создание новой координаты для движения
      * @param x координата  по оси х
      * @param y координата по оси у
      */
     void moveTo(float x, float y);

     /**
      * Создание новой координаты для движения
      * @param vector вектор координат
      */
     void moveTo(Vector2 vector);

     /**
      * Отрисовка коробля в текущих координатах
      * @param batch объект отвечающий за отрисовку всего на сцене
      */
     void draw(SpriteBatch batch);

     /**
      * Обновление координат в зависимости от времени обновления последнего кадра
      * @param delta время обновления кадра
      */
     void update(float delta);
}
