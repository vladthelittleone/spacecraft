package com.spacecraft.game.language;

import javax.tools.Diagnostic;

/**
 * @author Skurishin Vladislav
 * @since 14.06.15
 */
public interface RunResult
{
    public final static long NO_POS = -1;

    public static final String EMPTY_CODE = "";

    Diagnostic.Kind getKind();

    String getMessage();

    String getCode();

    boolean isOnRunError();

    long getPosition();

    long getColumnNumber();

    long getLineNumber();

    long getStartPosition();

    long getEndPosition();
}
