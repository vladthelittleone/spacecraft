package com.spacecraft.game.language.java;

import com.spacecraft.game.language.CodeRunner;
import com.spacecraft.game.language.RunResult;
import com.spacecraft.game.language.java.compiler.JavaSourceCompiler;
import com.spacecraft.game.language.java.compiler.impl.JavaSourceCompilerImpl;

import javax.tools.Diagnostic;
import javax.tools.DiagnosticCollector;
import javax.tools.JavaFileObject;
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
    public List<RunResult> run(String code)
    {
        DiagnosticCollector<JavaFileObject> diagnosticsCollector = new DiagnosticCollector<>();
        JavaSourceCompiler.CompilationUnit compilationUnit = JAVA_SOURCE_COMPILER
                .createCompilationUnit();
        compilationUnit.addJavaSource(CLASS_NAME, code);

        ClassLoader classLoader = JAVA_SOURCE_COMPILER.compile(compilationUnit, diagnosticsCollector);

        for (Diagnostic<?> diagnostic : diagnosticsCollector.getDiagnostics())
        {
            System.out.println(diagnostic.getKind());
            System.out.println(diagnostic.getCode());
            System.out.println(diagnostic.getLineNumber());
            System.out.println(diagnostic.getMessage(null));
            System.out.println(diagnostic.getColumnNumber());
            System.out.println(diagnostic.getPosition());
            System.out.println(diagnostic.getSource());
            System.out.println(diagnostic.getStartPosition());
            System.out.println(diagnostic.getEndPosition());
        }

        try
        {
            Class<?> clazz = classLoader.loadClass(CLASS_NAME);
            Object foo = clazz.newInstance();
            Method run = clazz.getMethod("run", String.class);
            String args = "Hello world!";
            run.invoke(foo, args);

//            Сохранение класса в файловой системе, а не в памяти.
//            JAVA_SOURCE_COMPILER.persistCompiledClasses(compilationUnit);
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }

        return null;
    }

    public static String template()
    {
        return new StringBuilder()
                .append("package com.my.sources;")
                .append("\n\n")
                .append("public class Module {")
                .append("\n\n")
                .append("   public Module() {")
                .append("\n\n")
                .append("   }")
                .append("\n\n")
                .append("   public void run(String str) {")
                .append("\n")
                .append("       System.out.println(str);")
                .append("\n")
                .append("   }")
                .append("\n\n")
                .append("}")
                .toString();
    }
}
