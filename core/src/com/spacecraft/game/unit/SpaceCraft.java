package com.spacecraft.game.unit;

import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.Sprite;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.math.Vector2;

import static com.spacecraft.game.GameManager.SPACE_CRAFT_SPRITE_PATH;
import static com.spacecraft.game.GameManager.assetManager;

/**
 * @author Makovchik Ivan
 * @since 14.06.15
 */
public class SpaceCraft implements Unit
{
    private final float SCALE = 0.1f;

    private final Sprite sprite = new Sprite(assetManager().get(SPACE_CRAFT_SPRITE_PATH, Texture.class));

    // Текущие координаты корабля и новые координаты корабля
    private final Vector2 position = new Vector2(0, 0);
    private final Vector2 newPosition = new Vector2();
    private final Vector2 deltaPosition = new Vector2();

    //Скорость корабля
    private float velocity = 1;

    public SpaceCraft()
    {
        sprite.setScale(SCALE);
    }

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
        sprite.setPosition(position.x, position.y);
        sprite.draw(batch);
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
