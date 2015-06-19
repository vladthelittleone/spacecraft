package com.spacecraft.game;

import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.utils.Json;

/**
 * @author Makovchik Ivan
 * @since 18.06.2015.
 */
public class GameManager
{
    private final static AssetManager manager = new AssetManager();

    public final static String SPACE_CRAFT_SPRITE_PATH = "sprites/spaceCraft.png";
    public final static String SKIN_PATH = "skins/uiskin.json";

    public static void initialize()
    {
        manager.load(SPACE_CRAFT_SPRITE_PATH, Texture.class);
        manager.load(SKIN_PATH, Json.class);

        manager.finishLoading();
    }

    public static AssetManager assetManager()
    {
        return manager;
    }
}
