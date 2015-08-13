package com.spacecraft.game;

import com.badlogic.gdx.Game;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.FPSLogger;
import com.badlogic.gdx.graphics.OrthographicCamera;
import com.spacecraft.game.screens.MainWindowScreen;

public class SCGame extends Game
{
    private FPSLogger fps;

    public static OrthographicCamera camera;

    @Override
    public void create()
    {
        createCamera();

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

    private void createCamera()
    {
        float w = Gdx.graphics.getWidth();
        float h = Gdx.graphics.getHeight();

        camera = new OrthographicCamera(1000f, 1000f * (h / w));
        camera.position.set(camera.viewportWidth / 2f, camera.viewportHeight / 2f, 0);
        camera.update();
    }
}
