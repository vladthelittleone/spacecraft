package com.spacecraft.game.screens;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.ScreenAdapter;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.scenes.scene2d.InputEvent;
import com.badlogic.gdx.scenes.scene2d.Stage;
import com.badlogic.gdx.scenes.scene2d.actions.Actions;
import com.badlogic.gdx.scenes.scene2d.ui.Skin;
import com.badlogic.gdx.scenes.scene2d.ui.Table;
import com.badlogic.gdx.scenes.scene2d.ui.TextArea;
import com.badlogic.gdx.scenes.scene2d.ui.TextButton;
import com.badlogic.gdx.scenes.scene2d.utils.ClickListener;
import com.badlogic.gdx.utils.viewport.ScreenViewport;
import com.spacecraft.game.language.CodeRunner;
import com.spacecraft.game.language.java.JavaCodeRunner;
import com.spacecraft.game.unit.SpaceCraft;

/**
 * @author Skurishin Vladislav
 * @since 09.06.15
 */
public class MainWindowScreen extends ScreenAdapter
{
    private static final float FADE_DURATION = 0.5f;
    private static final String SKIN_PATH = "skins/uiskin.json";

    private final Stage stage;
    private final Table table;

    private final SpriteBatch batch;

    private final TextArea codeArea;

    private final Skin skin;

    private SpaceCraft spaceCraft;

    public MainWindowScreen()
    {
        batch = new SpriteBatch();

        spaceCraft = new SpaceCraft();

        skin = new Skin(Gdx.files.internal(SKIN_PATH));

        stage = new Stage(new ScreenViewport());
        table = new Table();

        codeArea = new TextArea(JavaCodeRunner.template(), skin);

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
        table.add().expandX();
        table.add().expandX();
        table.add(getButtonGroup()).expandX().fill();

        table.row();

        table.add().expand();
        table.add().expand();
        table.add(codeArea).expand().fill();
    }

    private Table getButtonGroup()
    {
        final Table buttonsTable = new Table();

        final TextButton codeButton = new TextButton("{}", skin);
        final TextButton runButton = new TextButton(">", skin);
        final TextButton stopButton = new TextButton("||", skin);

        codeButton.addListener(new ClickListener()
        {
            private boolean view = true;

            @Override
            public void clicked(InputEvent event, float x, float y)
            {
                view = !view;

                if (view)
                {
                    codeArea.addAction(Actions.fadeIn(FADE_DURATION));
                }
                else
                {
                    codeArea.addAction(Actions.fadeOut(FADE_DURATION));
                }
            }
        });

        runButton.addListener(new ClickListener()
        {
            @Override
            public void clicked(InputEvent event, float x, float y)
            {
                CodeRunner javaCodeRunner = JavaCodeRunner.instance();
                javaCodeRunner.run(codeArea.getText());
            }
        });

        buttonsTable.add(codeButton).expand().fill();
        buttonsTable.add(runButton).expand().fill();
        buttonsTable.add(stopButton).expand().fill();

        return buttonsTable;
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

        spaceCraft.update(delta);
        spaceCraft.draw(batch);
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
