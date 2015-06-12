package com.spacecraft.game.language;

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
    void run(String code);
}
