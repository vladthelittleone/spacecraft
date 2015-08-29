package com.spacecraft.game.language.java;

import com.google.common.collect.Lists;
import com.spacecraft.game.language.CodeRunner;
import com.spacecraft.game.language.RunResult;
import com.spacecraft.game.language.java.compiler.JavaSourceCompiler;
import com.spacecraft.game.language.java.compiler.impl.JavaSourceCompilerImpl;
import com.spacecraft.game.unit.Unit;

import javax.tools.Diagnostic;
import javax.tools.DiagnosticCollector;
import javax.tools.JavaFileObject;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;

/**
 * Класс запуска java-кода. Является синглтоном.
 *
 * @author Skurishin Vladislav
 * @since 13.06.15
 */
public class JavaCodeRunner implements CodeRunner
{
    private static final String CLASS_NAME = "com.my.sources.Module";

    private final JavaSourceCompiler JAVA_SOURCE_COMPILER = new JavaSourceCompilerImpl();

    private static volatile JavaCodeRunner instance;

    private JavaCodeRunner()
    {
    }

    public static JavaCodeRunner instance()
    {
        JavaCodeRunner localInstance = instance;

        if (localInstance == null)
        {
            synchronized (JavaCodeRunner.class)
            {
                localInstance = instance;

                if (localInstance == null)
                {
                    instance = localInstance = new JavaCodeRunner();
                }
            }
        }

        return localInstance;
    }

    @Override
    public List<RunResult> run(String code, Unit unit)
    {
        List<RunResult> javaRunResults = Lists.newArrayList();
        DiagnosticCollector<JavaFileObject> diagnosticsCollector = new DiagnosticCollector<>();

        JavaSourceCompiler.CompilationUnit compilationUnit = JAVA_SOURCE_COMPILER
                .createCompilationUnit();
        compilationUnit.addJavaSource(CLASS_NAME, code);

        ClassLoader classLoader = JAVA_SOURCE_COMPILER.compile(compilationUnit, diagnosticsCollector);

        for (Diagnostic<?> diagnostic : diagnosticsCollector.getDiagnostics())
        {
            System.err.println(diagnostic.toString());
        }

        try
        {
            Class<?> clazz = classLoader.loadClass(CLASS_NAME);
            Object foo = clazz.newInstance();
            Method run = clazz.getMethod("run", Unit.class);
            run.invoke(foo, unit);

//            Сохранение класса в файловой системе, а не в памяти.
//            JAVA_SOURCE_COMPILER.persistCompiledClasses(compilationUnit);
        }
        catch (NoSuchMethodException e)
        {
            javaRunResults.add(JavaRunResultBuilder.canNotFindMethodError("run()"));
        }
        catch (IllegalAccessException | InvocationTargetException e)
        {
            javaRunResults.add(JavaRunResultBuilder.haveNotAccessToInvokeError());
        }
        catch (ClassNotFoundException | InstantiationException e)
        {
            javaRunResults.add(JavaRunResultBuilder.canNotFindClassError(CLASS_NAME));
        }

        if (javaRunResults.isEmpty())
        {
            javaRunResults.addAll(list(diagnosticsCollector.getDiagnostics()));
        }

        return javaRunResults;
    }

    private static List<RunResult> list(List<Diagnostic<? extends JavaFileObject>> diagnostics)
    {
        List<RunResult> results = Lists.newArrayList();

        for (Diagnostic<?> d : diagnostics)
        {
            results.add(new JavaRunResult(d));
        }

        return results;
    }

    public static String template()
    {
        return new StringBuilder()
                .append("package com.my.sources;")
                .append("\n\n")
                .append("import com.spacecraft.game.unit.Unit;")
                .append("\n\n")
                .append("public class Module {")
                .append("\n\n")
                .append("   public Module() {")
                .append("\n\n")
                .append("   }")
                .append("\n\n")
                .append("   public void run(Unit unit) {")
                .append("\n")
                .append("       unit.moveTo(50,50);")
                .append("\n")
                .append("   }")
                .append("\n\n")
                .append("}")
                .toString();
    }
}
