package com.spacecraft.game;

import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.graphics.Texture;

/**
 * @author Makovchik Ivan
 * @since 18.06.2015.
 */
public final class GameManager
{
    private  static AssetManager manager;

    public static void initialize()
    {
        manager = new AssetManager();
    }

    public static AssetManager assetManager()
    {
        manager.load("sprites/spaceCraft.png",Texture.class);
        return manager;
    }
}
