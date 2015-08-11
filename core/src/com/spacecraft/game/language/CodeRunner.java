package com.spacecraft.game.language;

import com.spacecraft.game.unit.Unit;

import java.util.List;

/**
 * Интерфейс запуска кода для языка заданной реализации.
 *
 * @see com.spacecraft.game.language.java.JavaCodeRunner
 * @author Skurishin Vladislav
 * @since 13.06.15
 */
public interface CodeRunner
{
    /**
     * Запуск кода.
     *
     * @param code - выполняемый код.
     * @param unit - передаваймый в метод run() параметр.
     * @see com.spacecraft.game.language.RunResult
     */
    List<RunResult> run(String code, Unit unit);
}
