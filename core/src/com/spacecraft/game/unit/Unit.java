package com.spacecraft.game.unit;

import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.math.Vector2;


/**
 * Created by vaimer on 14.06.2015.
 */
public interface Unit
{
     void moveTo(float x, float y);
     void moveTo(Vector2 vector);
     void draw(SpriteBatch batch);
}
