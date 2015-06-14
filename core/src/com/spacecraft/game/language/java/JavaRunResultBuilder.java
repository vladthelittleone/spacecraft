package com.spacecraft.game.language.java;

import javax.tools.Diagnostic;

import static com.spacecraft.game.language.RunResult.NO_POS;
import static java.lang.String.format;

/**
 * @author Skurishin Vladislav
 * @since 15.06.15
 */
public class JavaRunResultBuilder
{
    public static JavaRunResult build(Diagnostic<?> diagnostic)
    {
        return new JavaRunResult(diagnostic);
    }

    public static JavaRunResult build(Diagnostic.Kind kind, String message)
    {
        return new JavaRunResult(kind, message, true, NO_POS, NO_POS, NO_POS, NO_POS, NO_POS);
    }

    public static JavaRunResult errorRunResult(String message)
    {
        return build(Diagnostic.Kind.ERROR, message);
    }

    public static JavaRunResult canNotFindMethodError(String method)
    {
        return errorRunResult(format("Can't find %s method", method));
    }

    public static JavaRunResult haveNotAccessToInvokeError()
    {
        return errorRunResult("You haven't access to invoke some methods");
    }

    public static JavaRunResult canNotFindClassError(String clazz)
    {
        return errorRunResult(format("Can't find %s class", clazz));
    }
}
