package com.spacecraft.game.unit;

import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.math.Vector2;


/**
 * Created by vaimer on 14.06.2015.
 */
public interface Unit
{
     /**
      * Set new coordinate
      * @param x
      * @param y
      */
     void moveTo(float x, float y);

     /**
      * Set new coordinate
      * @param vector
      */
     void moveTo(Vector2 vector);

     /**
      *   Drawing of the ship in the current coordinates
      * @param batch
      */
     void draw(SpriteBatch batch);

     /**
      * Update curret coordinate of  time
      * @param delta
      */
     void update(float delta);
}
