package com.spacecraft.game.unit;

import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.math.Vector2;


/**
 * Created by vaimer on 14.06.2015.
 */
public interface Unit
{
     /**
      * —оздание новой координаты дл€ движени€
      * @param x координата  по оси х
      * @param y координата по оси у
      */
     void moveTo(float x, float y);

     /**
      * —оздание новой координаты дл€ движени€
      * @param vector вектор координат
      */
     void moveTo(Vector2 vector);

     /**
      * ќтрисовка коробл€ в текущих координатах
      * @param batch объект отвечающий за отрисовку всего на сцене
      */
     void draw(SpriteBatch batch);

     /**
      * ќбновление координат в зависимости от времени обновлени€ последнего кадра
      * @param delta врем€ обновлени€ кадра
      */
     void update(float delta);
}
