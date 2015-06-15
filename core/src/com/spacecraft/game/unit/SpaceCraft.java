package com.spacecraft.game.unit;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.graphics.g2d.TextureRegion;
import com.badlogic.gdx.math.Vector2;
/**
 * Created by vaimer on 14.06.2015.
 */
public class SpaceCraft implements Unit
{
    private Texture texture;
    private TextureRegion region;

    // Текущие координаты корабля и новые координаты корабля
    private Vector2 position = new Vector2();
    private Vector2 NewPosition = new Vector2();

    //Скорость корабля
    private float velocity;

    public SpaceCraft(String file,float velocity)
    {
        position.add(0,0);
        this.texture = new Texture(Gdx.files.internal(file));
        this.velocity = velocity;
    }

    @Override
    public void moveTo(float x, float y)
    {
        NewPosition.add(x,y);
    }

    @Override
    public void moveTo(Vector2 vector)
    {
        NewPosition.add(vector);
    }

    @Override
    public void draw(SpriteBatch batch)
    {
        batch.draw(region,position.x,position.y);
    }

    @Override
    public void update(float delta)
    {
        float change = velocity * delta;

        if ( ( position.x < NewPosition.x ) && ( position.y < NewPosition.y ) )
        {
            position.add( position.x + change, position.y + change );
        }
    }

}
