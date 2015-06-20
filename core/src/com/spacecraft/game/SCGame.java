package com.spacecraft.game;

import com.badlogic.gdx.Game;
import com.badlogic.gdx.graphics.FPSLogger;
import com.spacecraft.game.screens.MainWindowScreen;

public class SCGame extends Game
{
    private FPSLogger fps;

    @Override
    public void create()
    {
        // Инициализируем менедеры
        GameManager.initialize();

        // Создание всех игровых сервисов, объектов.
        fps = new FPSLogger();
        setScreen(new MainWindowScreen());
    }

    @Override
    public void render()
    {
        super.render();
        fps.log();
    }
}
