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

    private static final SpriteBatch batch = new SpriteBatch();
    private Texture texture;
    private TextureRegion region;

    // Текущие координаты корабля
    private float positionX;
    private float positionY;

    //Новые координаты корадля
    private float newPositionX = 0;
    private float newPositionY = 0;

    //Частота обновления рендера(или апдейт)
    private float delta = 0.1f;

    //Скорость корабля
    private float velocity;

    /*Пока не понял как и где брать дельту с батчем( я не нашел в проекте созаданный класс
    с этими обьектами, или я должен был его сам сделать, вообщем сделал пока так, чтобы
    была ясна моя логика, скорость умножаем на дельту получаем изменение координаты за одну отрисовку
     */
    public SpaceCraft(String file,float velocity)
    {
        this.texture = new Texture(Gdx.files.internal(file));
        positionX = 0;
        positionY = 0;
        region = new TextureRegion(texture, 20, 20, 50, 50);
        this.velocity = velocity * delta;
        draw(batch);
    }

    /*Изменянем координаты до тех пор пока не сравняемся с новыми и отрисовываем измененные
    текущие , пока все равно общая картина проекта не ясна, возиожно потому что либу плохо знаю, туторы
    не смотрел пока из-за бд,  в понедельник сяду серьезнее , а так я набросал общую логику
    работы как я ее увидел
    */
    @Override
    public void moveTo(float x, float y)
    {
        newPositionX = x;
        newPositionY = y;
        while((positionX <= newPositionX) && (positionY <= newPositionY))
        {
            if(positionX != newPositionX)
                positionX += velocity;
            if (positionY != newPositionY)
                positionY += velocity;
            draw(batch);
        }
    }

    //Не стал его реализовывать пока с первой функцией не разобрался
    @Override
    public void moveTo(Vector2 vector)
    {

    }

    @Override
    public void draw(SpriteBatch batch)
    {
        batch.draw(region,positionX,positionY);
    }
}
