package com.spacecraft.game.screens;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.ScreenAdapter;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.scenes.scene2d.Stage;
import com.badlogic.gdx.utils.viewport.ScreenViewport;

/**
 * @author Skurishin Vladislav
 * @since 09.06.15
 */
public class MainWindowScreen extends ScreenAdapter
{
    private Stage stage;

    public MainWindowScreen()
    {
        stage = new Stage(new ScreenViewport());
    }

    @Override
    public void render(float delta)
    {
        /**
         * Очистка буфера цвета.
         */
        Gdx.gl.glClearColor(0, 0, 0, 1);
        Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);

        /**
         * Вызов у всех актеров метода {@link com.badlogic.gdx.scenes.scene2d.Actor#act(float)}.
         */
        stage.act(delta);
        stage.draw();
    }

    @Override
    public void dispose()
    {
        stage.dispose();
    }
}
