package com.spacecraft.game;

import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.graphics.Texture;

/**
 * @author Makovchik Ivan
 * @since 18.06.2015.
 */
public final class GameMenager
{
    private final AssetManager menager = new AssetManager();

    private static volatile GameMenager instance;

    private GameMenager(){
    }

    public static GameMenager initialize(){
        GameMenager localInstance = instance;

        if (localInstance == null)
        {
            synchronized (GameMenager.class)
            {
                localInstance = instance;

                if (localInstance == null)
                {
                    instance = localInstance = new GameMenager();
                }
            }
        }

        return localInstance;
    }

    public final  AssetManager assetMenager(){
        menager.load("sprites/spaceCraft.png",Texture.class);

        return menager;
    }
}
