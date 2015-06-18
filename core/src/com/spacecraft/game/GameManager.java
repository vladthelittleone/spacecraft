package com.spacecraft.game;

import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.graphics.Texture;

/**
 * @author Makovchik Ivan
 * @since 18.06.2015.
 */
public final class GameManager
{
    private final static AssetManager manager = new AssetManager();

    private static volatile GameManager instance;

    private GameManager()
    {
    }

    public static GameManager initialize()
    {
        GameManager localInstance = instance;

        if (localInstance == null)
        {
            synchronized (GameManager.class)
            {
                localInstance = instance;

                if (localInstance == null)
                {
                    instance = localInstance = new GameManager();
                }
            }
        }

        manager.load("sprites/spaceCraft.png",Texture.class);

        return localInstance;
    }

    public final static AssetManager assetMenager()
    {
        return manager;
    }
}
