package com.spacecraft.game.language;

import javax.tools.Diagnostic;

/**
 * Результат выполнения, хранящий все ошибки запуска кода.
 *
 * @see com.spacecraft.game.language.java.JavaRunResult
 * @author Skurishin Vladislav
 * @since 14.06.15
 */
public interface RunResult
{
    /**
     * Константа сообщающая, что для параметра нет значения.
     */
    public final static long NO_POS = -1;

    /**
     * Константа пустой строки. Используется в {@link #getCode()}
     */
    public static final String EMPTY_CODE = "";

    /**
     * @return тип ошибки
     */
    Diagnostic.Kind getKind();

    /**
     * @return сообщение ошибки
     */
    String getMessage();

    /**
     * @return код ошибки
     */
    String getCode();

    /**
     * @return ошбика произошла во время выполнения (true) или во время компиляции (false)
     */
    boolean isOnRunError();

    /**
     * @return позиция ошибки
     */
    long getPosition();

    /**
     * @return столбец ошибки
     */
    long getColumnNumber();

    /**
     * @return строка ошибки
     */
    long getLineNumber();

    /**
     * @return позиция начала ошибки
     */
    long getStartPosition();

    /**
     * @return позиция конца ошибки
     */
    long getEndPosition();
}
