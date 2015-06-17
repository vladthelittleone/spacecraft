package com.spacecraft.game.desktop;

import com.badlogic.gdx.backends.lwjgl.LwjglApplication;
import com.badlogic.gdx.backends.lwjgl.LwjglApplicationConfiguration;
import com.spacecraft.game.SCGame;

public class DesktopLauncher
{
    public static void main(String[] arg)
    {
        new LwjglApplication(new SCGame(), getConfiguration());
    }

    private static LwjglApplicationConfiguration getConfiguration()
    {
        LwjglApplicationConfiguration cfg = new LwjglApplicationConfiguration();

        cfg.title = "SpaceCraft";

        cfg.width = 1024;
        cfg.height = 768;

        cfg.vSyncEnabled = true;
        cfg.resizable = false;

//        Включаем GL30 и выше
//        cfg.useGL30 = true;

        return cfg;
    }
}
