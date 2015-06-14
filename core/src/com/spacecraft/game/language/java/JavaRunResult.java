package com.spacecraft.game.language.java;

import com.spacecraft.game.language.RunResult;

import javax.tools.Diagnostic;
import javax.tools.Diagnostic.Kind;

/**
 * @author Skurishin Vladislav
 * @since 14.06.15
 */
public class JavaRunResult implements RunResult
{
    private final Kind kind;
    private final String message;
    private final boolean onRunError;
    private final long position;
    private final long columnNumber;
    private final long lineNumber;
    private final long startPosition;
    private final long endPosition;

    protected JavaRunResult(Kind kind,
                            String message,
                            boolean onRunError,
                            long position,
                            long columnNumber,
                            long lineNumber,
                            long startPosition,
                            long endPosition)
    {
        this.kind = kind;
        this.message = message;
        this.onRunError = onRunError;
        this.position = position;
        this.columnNumber = columnNumber;
        this.lineNumber = lineNumber;
        this.startPosition = startPosition;
        this.endPosition = endPosition;
    }

    protected JavaRunResult(Diagnostic<?> diagnostic)
    {
        this.kind = diagnostic.getKind();
        this.position = diagnostic.getPosition();
        this.columnNumber = diagnostic.getColumnNumber();
        this.lineNumber = diagnostic.getLineNumber();
        this.startPosition = diagnostic.getStartPosition();
        this.endPosition = diagnostic.getEndPosition();
        this.message = diagnostic.getMessage(null);
        this.onRunError = false;
    }

    @Override
    public Kind getKind()
    {
        return kind;
    }

    @Override
    public long getPosition()
    {
        return position;
    }

    @Override
    public long getColumnNumber()
    {
        return columnNumber;
    }

    @Override
    public long getLineNumber()
    {
        return lineNumber;
    }

    @Override
    public long getStartPosition()
    {
        return startPosition;
    }

    @Override
    public long getEndPosition()
    {
        return endPosition;
    }

    @Override
    public String getMessage()
    {
        return message;
    }

    @Override
    public boolean isOnRunError()
    {
        return onRunError;
    }
}
