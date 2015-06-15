/**
 * Copyright 2011 Adrian Witas
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.spacecraft.game.language.java.compiler;

import com.spacecraft.game.language.java.compiler.registry.JavaFileObjectRegistry;

import javax.tools.DiagnosticCollector;
import javax.tools.JavaFileObject;
import java.io.File;
import java.util.Collection;
import java.util.List;

/**
 * Java source code compiler. It compiles given java class sources in memory and
 * loads them into memory. It utilises Java Compiler API.
 * <p>
 * <b>Usage:</b>
 * <ul>
 * <li>Simple source compilation</li>
 * <code><pre>
 *  JavaSourceCompiler javaSourceCompiler = new JavaSourceCompilerImpl();
 *  JavaSourceCompiler.CompilationUnit compilationUnit = javaSourceCompiler.createCompilationUnit();
 *  String javaSourceCode =  "package com.test.foo;\n" +
 *    "public class Foo {\n" +
 *    "        public static void main(String [] args) {\n" +
 *    "            System.out.println(\"Hello world\");\n" +
 *    "        }\n" +
 *    "    }";
 * <p/>
 *  compilationUnit.addJavaSource("com.test.foo.Foo", sourceCode);
 *  ClassLoader classLoader = javaSourceCompiler.compile(compilationUnit);
 *  Class fooClass = classLoader.loadClass("com.test.foo.Foo");
 *  </pre></code>
 * <p/>
 * <li>Java sources compilation with dependencies</li>
 * <p/>
 * <code><pre>
 *  JavaSourceCompiler javaSourceCompiler = new JavaSourceCompilerImpl();
 *  JavaSourceCompiler.CompilationUnit compilationUnit = javaSourceCompiler.createCompilationUnit();
 * <p/>
 *  compilationUnit.addClassPathEntry("/Users/xxxx/.m2/repository/javax/inject/javax.inject/1/javax.inject-1.jar");
 * <p/>
 *  String iBarSource =  "package com.test;\n" +
 *     "    public interface IBar {\n" +
 *     "         public void execute();\n" +
 *     "    }";
 * <p/>
 *  compilationUnit.addJavaSource("com.test.IBar", iBarSource);
 * <p/>
 * <p/>
 *  String barSource =  "package com.test;\n" +
 *    "import javax.inject.Inject;\n\n" +
 *    "public class Bar implements IBar {\n" +
 *    "        private final String message;\n" +
 *    "\n" +
 *    "        @Inject\n" +
 *    "        public Bar(String message) {\n" +
 *    "            this.message = message;\n" +
 *    "        }\n" +
 *    "\n" +
 *    "\n" +
 *    "        @Override\n" +
 *    "        public void execute() {\n" +
 *    "            System.out.println(message);\n" +
 *    "        }\n" +
 *    "    }";
 * <p/>
 *  compilationUnit.addJavaSource("com.test.IBar", barSource);
 * <p/>
 *  ClassLoader classLoader = javaSourceCompiler.compile(compilationUnit);
 *  Class iBar = classLoader.loadClass("com.test.IBar");
 *  Class bar = classLoader.loadClass("com.test.Bar");
 * <p/>
 * <p/>
 * </ul>
 * </p>
 *
 * @author Adrian Witas
 */
public interface JavaSourceCompiler
{
    /**
     * Creates a compilation unit
     *
     * @return compilation unit
     */
    CompilationUnit createCompilationUnit();

    /**
     * Create a compilation unit for the supplied output class directory.
     *
     * @param outputClassDirectory output class directory
     * @return compilation unit
     */
    CompilationUnit createCompilationUnit(File outputClassDirectory);

    /**
     * Compiles given compilation unit with the supplier compiler options and
     * returns class loader for the compiled sources.
     *
     * @param compilationUnit compilation unit
     * @param compilerOptions compiler options
     * @return class loader for the compiled classes
     */
    ClassLoader compile(CompilationUnit compilationUnit,
                        String... compilerOptions);

    /**
     * Compiles given compilation unit with the supplier compiler options and
     * returns class loader for the compiled sources.
     *
     * @param parentClassLoader parent class loader for the new class loader created for this
     *                          compilation
     * @param compilationUnit   compilation unit
     * @param compilerOptions   compiler options
     * @return class loader for the compiled classes
     */
    ClassLoader compile(ClassLoader parentClassLoader,
                        CompilationUnit compilationUnit, String... compilerOptions);

    /**
     * Compiles given compilation unit with the supplier compiler options and
     * returns class loader for the compiled sources. Allows the manual handling
     * of compilation errors/warnings using a {@link DiagnosticCollector}.
     *
     * @param compilationUnit      compilation unit
     * @param compilerOptions      compiler options
     * @param diagnosticsCollector The diagnostics collector which collects the results for this
     *                             compilation.
     * @return class loader for the compiled classes
     */
    ClassLoader compile(CompilationUnit compilationUnit,
                        DiagnosticCollector<JavaFileObject> diagnosticsCollector,
                        String... compilerOptions);

    /**
     * Compiles given compilation unit with the supplier compiler options and
     * returns class loader for the compiled sources. Allows the manual handling
     * of compilation errors/warnings using a {@link DiagnosticCollector}.
     *
     * @param parentClassLoader    parent class loader for the new class loader created for this
     *                             compilation
     * @param compilationUnit      compilation unit
     * @param compilerOptions      compiler options
     * @param diagnosticsCollector The diagnostics collector which collects the results for this
     *                             compilation.
     * @return class loader for the compiled classes
     */
    ClassLoader compile(ClassLoader parentClassLoader,
                        CompilationUnit compilationUnit,
                        DiagnosticCollector<JavaFileObject> diagnosticsCollector,
                        String... compilerOptions);

    /**
     * By default source code and compiled classes are stored in memory, this
     * however could be a limitation for libraries that scans dynamically
     * packages, and this method persists compiled classes to be accessible by
     * package scanners on the file system.
     *
     * @param compilationUnit compilation unit.
     */
    void persistCompiledClasses(CompilationUnit compilationUnit);

    /**
     * Represents an individual compilation unit. It isRegistered multiple java
     * sources and jar dependencies.
     */
    interface CompilationUnit
    {
        /**
         * Adds class path entry to java compiler
         * <p>
         * <b>Note</b> that if at least one entry is added, the current jvm
         * class path entries are not included. You can retrieve current jvm
         * class path entries from {@link com.spacecraft.game.language.java.compiler.util.ClassPathUtil#getClassPathEntries()}
         * <p/>
         * </p>
         *
         * @param classPathEntry class path entries
         */
        void addClassPathEntry(String classPathEntry);

        void addClassPathEntries(Collection<String> classPathEntries);

        void addJavaSource(String className, String source);

        JavaFileObjectRegistry getRegistry();

        List<String> getClassPathsEntries();

        File getOutputClassDirectory();

    }
}
