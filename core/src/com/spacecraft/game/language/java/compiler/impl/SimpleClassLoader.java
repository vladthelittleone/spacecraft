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
package com.spacecraft.game.language.java.compiler.impl;

import com.google.common.io.ByteStreams;
import com.google.common.io.Files;
import com.spacecraft.game.language.java.compiler.registry.JavaFileObjectRegistry;
import com.spacecraft.game.language.java.compiler.util.URIUtil;

import javax.tools.JavaFileObject;
import javax.tools.StandardLocation;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

/**
 * <p>
 * This implementation uses the following mechanism to lookup requested class.
 * <ul>
 * <li>java object registry:
 * {@link com.spacecraft.game.language.java.compiler.registry.JavaFileObjectRegistry}
 * </li>
 * <li>jar files class path entries</li>
 * <li>directory class path entries</li>
 * </ul>
 * Note that to be able find use {@link SimpleClassLoader#findResource(String)}
 * or {@link SimpleClassLoader#findResources(String)} for registry resources
 * (classes compiled in memory), please use
 * {@link JavaSourceCompilerImpl#persistCompiledClasses(com.spacecraft.game.language.java.compiler.JavaSourceCompiler.CompilationUnit)}
 * to persist compiled classes.
 * </p>
 *
 * @author Adrian Witas
 */
public class SimpleClassLoader extends ClassLoader
{
    private final List<JarFile> jarFiles = new ArrayList<>();
    private final List<File> classDirectories = new ArrayList<>();
    private final JavaFileObjectRegistry registry;
    private final File classOutputDirectory;

    /**
     * Constructor
     */
    public SimpleClassLoader(final ClassLoader parentClassLoader,
                             JavaFileObjectRegistry registry, File classOutputDirectory)
    {
        super(parentClassLoader);
        this.registry = registry;
        this.classOutputDirectory = classOutputDirectory;
    }

    /**
     * Adds the given classPathEntry to the classloader.
     *
     * @param classPathEntry The path to either a jar file or a directory containing class
     *                       files.
     */
    public void addClassPathEntry(String classPathEntry)
    {

        if (classPathEntry.endsWith(".jar"))
        {
            try
            {
                JarFile jarFile = new JarFile(classPathEntry);
                jarFiles.add(jarFile);
            }
            catch (IOException e)
            {
                throw new IllegalStateException(
                        "Failed to register classPath entry: " + classPathEntry,
                        e);
            }

        }
        else
        {
            File classDirectory = new File(classPathEntry);
            classDirectories.add(classDirectory);
        }
    }

    /**
     * Adds the given list of entries to the classpath.
     *
     * @param classPathEntries A list of entries to add to the classpath. Must be either
     *                         directories containing class files or .jar files.
     */
    public void addClassPathEntries(Iterable<String> classPathEntries)
    {
        for (String classPathEntry : classPathEntries)
        {
            addClassPathEntry(classPathEntry);
        }
    }

    @Override
    protected Class<?> findClass(final String qualifiedClassName)
            throws ClassNotFoundException
    {
        URI classUri = URIUtil.buildUri(StandardLocation.CLASS_OUTPUT,
                qualifiedClassName);
        if (registry.isRegistered(classUri))
        {
            JavaFileObject result = registry.get(classUri);
            byte[] byteCode = JavaCodeFileObject.class.cast(result)
                    .getByteCode();
            return defineClass(qualifiedClassName, byteCode, 0, byteCode.length);
        }

        Class<?> result = findClassInFileSystem(qualifiedClassName);
        if (result != null)
        {
            return result;
        }
        result = findClassInJarFile(qualifiedClassName);
        if (result != null)
        {
            return result;
        }
        try
        {
            result = Class.forName(qualifiedClassName);
            return result;
        }
        catch (ClassNotFoundException nf)
        {
            // Ignore and fall through
        }
        return super.findClass(qualifiedClassName);
    }

    protected Class<?> findClassInFileSystem(String qualifiedClassName)
    {
        for (File classDirectory : classDirectories)
        {
            File classFile = new File(classDirectory,
                    qualifiedClassName.replace('.', '/') + ".class");
            if (classFile.exists())
            {
                try
                {
                    byte[] byteCode = Files.toByteArray(classFile);
                    return defineClass(qualifiedClassName, byteCode, 0,
                            byteCode.length);
                }
                catch (IOException e)
                {
                    throw new IllegalStateException(
                            "Failed to read class file " + classFile, e);
                }
            }
        }
        return null;
    }

    protected Class<?> findClassInJarFile(String qualifiedClassName)
    {
        URI classUri = URIUtil.buildUri(StandardLocation.CLASS_OUTPUT,
                qualifiedClassName);
        String internalClassName = classUri.getPath().substring(1);
        for (JarFile jarFile : jarFiles)
        {
            JarEntry jarEntry = jarFile.getJarEntry(internalClassName);
            if (jarEntry != null)
            {
                try (InputStream inputStream = jarFile.getInputStream(jarEntry))
                {
                    byte[] byteCode = new byte[(int) jarEntry.getSize()];
                    ByteStreams.read(inputStream, byteCode, 0, byteCode.length);
                    return defineClass(qualifiedClassName, byteCode, 0,
                            byteCode.length);
                }
                catch (IOException e)
                {
                    throw new IllegalStateException(String.format(
                            "Failed to lookup class %s in jar file %s",
                            qualifiedClassName, jarFile), e);
                }
            }
        }
        return null;
    }

    @Override
    protected Enumeration<URL> findResources(String resource)
            throws IOException
    {
        List<URL> result = new ArrayList<>(Collections.list(super
                .findResources(resource)));
        findResourcesInJarFiles(result, resource);
        findResourcesInJavaFileObjectRegistry(result, resource);
        return Collections.enumeration(result);
    }

    protected void findResourcesInJarFiles(List<URL> result, String resource)
            throws MalformedURLException
    {
        for (JarFile jarFile : jarFiles)
        {
            JarEntry entry = jarFile.getJarEntry(resource);
            if (entry != null)
            {
                result.add(new URL("jar", "", String.format("file:%s!%s",
                        jarFile.getName(), resource)));
            }
        }
    }

    protected void findResourcesInJavaFileObjectRegistry(List<URL> result,
                                                         String resource) throws MalformedURLException
    {
        for (JavaFileObject javaFileObject : registry
                .get(JavaFileObject.Kind.CLASS))
        {
            String internalName = javaFileObject.getName().substring(1);
            if (internalName.startsWith(resource))
            {
                File file = new File(classOutputDirectory, internalName);
                result.add(new URL(String.format("file://%s",
                        file.getAbsolutePath())));
            }
        }
    }
}
