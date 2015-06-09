package com.spacecraft.game;

import com.badlogic.gdx.Game;
import com.badlogic.gdx.graphics.FPSLogger;

public class SpaceCraft extends Game
{
    private FPSLogger fps;

    @Override
    public void create()
    {
        // Создание всех игровых сервисов, объектов.
        fps = new FPSLogger();
    }

    @Override
    public void render()
    {
        super.render();
        fps.log();
    }
}
