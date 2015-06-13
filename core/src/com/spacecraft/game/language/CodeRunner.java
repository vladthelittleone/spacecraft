package com.spacecraft.game.language;

import java.util.List;

/**
 * Интерфейс запуска кода для языка заданной реализации.
 *
 * @author Skurishin Vladislav
 * @since 13.06.15
 */
public interface CodeRunner
{
    /**
     * Запуск кода.
     */
    List<RunResult> run(String code);
}
