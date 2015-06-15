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
    private final Texture texture = new Texture(Gdx.files.internal("images/spaceCraft.png"));
    private final TextureRegion region = new TextureRegion(texture, 10, 15);

    // Текущие координаты корабля и новые координаты корабля
    private final Vector2 position = new Vector2(0, 0);
    private final Vector2 newPosition = new Vector2();
    private final Vector2 deltaPosition = new Vector2();

    //Скорость корабля
    private  float velocity = 0;


    @Override
    public void moveTo(float x, float y)
    {
        newPosition.add(x, y);
        deltaPosition.add( x - position.x, y  - position.y);
    }

    @Override
    public void moveTo(Vector2 vector)
    {
        newPosition.add(vector);
        deltaPosition.add( vector.x - position.x, vector.y - position.y);
    }

    @Override
    public void draw(SpriteBatch batch)
    {
        batch.draw(region, position.x, position.y);
    }



    @Override
    public void update(float delta)
    {
        float deltaVelocity = velocity * delta;

        if ((position.x != newPosition.x) && (position.y != newPosition.y))
        {
            changePosition(deltaVelocity);
        }
    }

    public float getVelocity()
    {
        return velocity;
    }

    public void setVelocity(float velocity)
    {
        this.velocity = velocity;
    }

    private void changePosition(float deltaVelocity)
    {
        float x = position.x + deltaPosition.x * deltaVelocity;
        float y = position.y + deltaPosition.y * deltaVelocity;

        position.add(x, y);
    }
}
