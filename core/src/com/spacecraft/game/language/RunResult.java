package com.spacecraft.game.language;

import javax.tools.Diagnostic;

/**
 * @author Skurishin Vladislav
 * @since 14.06.15
 */
public interface RunResult
{
    public final static long NO_POS = -1;

    Diagnostic.Kind getKind();

    String getMessage();

    boolean isOnRunError();

    long getPosition();

    long getColumnNumber();

    long getLineNumber();

    long getStartPosition();

    long getEndPosition();
}
