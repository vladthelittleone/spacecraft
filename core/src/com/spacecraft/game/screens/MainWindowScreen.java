package com.spacecraft.game.screens;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.ScreenAdapter;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.scenes.scene2d.Stage;
import com.badlogic.gdx.scenes.scene2d.ui.Label;
import com.badlogic.gdx.scenes.scene2d.ui.Skin;
import com.badlogic.gdx.scenes.scene2d.ui.Table;
import com.badlogic.gdx.scenes.scene2d.ui.TextField;
import com.badlogic.gdx.utils.viewport.ScreenViewport;

/**
 * @author Skurishin Vladislav
 * @since 09.06.15
 */
public class MainWindowScreen extends ScreenAdapter
{
    private static final String SKIN_PATH = "skins/uiskin.json";

    private Stage stage;
    private Table table;

    public MainWindowScreen()
    {
        stage = new Stage(new ScreenViewport());
        table = new Table();

        // Заполняем весь рут таблицей
        table.setFillParent(true);

        // Включаем debug-мод.
        table.debug();

        stage.addActor(table);
        Gdx.input.setInputProcessor(stage);

        createTableContent();
    }

    private void createTableContent()
    {
        Skin skin = new Skin(Gdx.files.internal(SKIN_PATH));

        Label nameLabel = new Label("Name:", skin);
        TextField nameText = new TextField("", skin);
        Label addressLabel = new Label("Address:", skin);
        TextField addressText = new TextField("", skin);

        table.add(nameLabel);
        table.add(nameText).width(100);
        table.row();
        table.add(addressLabel);
        table.add(addressText).width(100);
    }

    @Override
    public void render(float delta)
    {
        /**
         * Очистка буфера цвета.
         */
        Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);

        /**
         * Вызов у всех актеров метода {@link com.badlogic.gdx.scenes.scene2d.Actor#act(float)},
         * используюшегося для обработки логики по времени. (Аналог обновления)
         */
        stage.act(delta);
        stage.draw();
    }

    /**
     * Формально метод не нужен по причине {@code cfg.resizable = false} - отключения ресайза.
     */
    @Override
    public void resize(int width, int height)
    {
        // Обновляем специфичный для stage viewport.
        stage.getViewport().update(width, height, true);
    }

    @Override
    public void dispose()
    {
        stage.dispose();
    }
}
