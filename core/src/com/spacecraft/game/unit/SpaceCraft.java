package com.spacecraft.game.unit;


import com.sun.prism.Texture;

/**
 * Created by vaimer on 14.06.2015.
 */
public class SpaceCraft implements Unit
{
    private SpriteBatch batch = new SpriteBatch();
    private Texture texture;
    private float positionX;
    private float positionY;
    private TexttureRegion region;
    public SpaceCraft(String file){
        this.texture = new Texture(Gdx.files.internal(file));
        positionX = 0;
        positionY = 0;
        region = new TextureRegion(texture,20,20,50,50);
        batch.begin();
        batch.draw(region,positionX,positionY);
        batch.end();
    }
    @Override
    public void moveTo(float x, float y)
    {
        positionX = x;
        positionY = y;
        batch.begin();
        batch.draw(region,positionX,positionY);
        batch.end();
    }
}
