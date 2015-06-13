package com.spacecraft.game.language;

/**
 * @author Skurishin Vladislav
 * @since 14.06.15
 */
public interface RunResult
{
    enum Type
    {
        ERROR,

        WARNING,

        MANDATORY_WARNING,

        NOTE,

        OTHER
    }

    public final static long NO_POS = -1;

    Type getType();

    long getPosition();

    long getColumnNumber();

    long getLineNumber();

    long getStartPosition();

    long getEndPosition();

    String getMessage();
}
