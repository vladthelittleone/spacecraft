package com.spacecraft.game.unit;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.files.FileHandle;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.graphics.g2d.TextureRegion;
import com.badlogic.gdx.math.Vector2;

/**
 * Created by vaimer on 14.06.2015.
 */
public class SpaceCraft implements Unit
{
    private final FileHandle SPACE_CRAFT_INTERNAL = Gdx.files.internal("images/spaceCraft.png");

    private final Texture texture = new Texture(SPACE_CRAFT_INTERNAL);
    private final TextureRegion region = new TextureRegion(texture, 10, 15);

    // Текущие координаты корабля и новые координаты корабля
    private final Vector2 position = new Vector2(0, 0);
    private final Vector2 newPosition = new Vector2();
    private final Vector2 deltaPosition = new Vector2();

    //Скорость корабля
    private float velocity = 100;


    @Override
    public void moveTo(float x, float y)
    {
        newPosition.set(x, y);
        deltaPosition.set(newPosition).sub(position).nor();
    }

    @Override
    public void moveTo(Vector2 vector)
    {
        newPosition.set(vector);
        deltaPosition.set(vector).sub(position).nor();
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

        if (!(position.equals(newPosition)))
        {
            changePosition(deltaVelocity);
        }
    }

    /**
     * Изменение текущих координат
     * @param deltaVelocity длина пройденного пути с момента обновления последнего кадра
     */
    private void changePosition(float deltaVelocity)
    {
        position.mulAdd(deltaPosition, deltaVelocity);
    }

    public Vector2 getPosition()
    {
        return position;
    }

    public float getVelocity()
    {
        return velocity;
    }
}
