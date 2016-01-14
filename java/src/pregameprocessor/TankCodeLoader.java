package pregameprocessor;

import database.DBTank;
import database.GameDatabase;
import database.GameDatabaseImpl;
import game.board.elements.Tank;
import game.util.JavaSourceFromString;
import org.bson.types.ObjectId;

import javax.tools.*;
import java.io.File;
import java.lang.reflect.Constructor;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.Arrays;

/**
 * Created by nathand on 12/1/15.
 */
public class TankCodeLoader {

    public static GameDatabase db = GameDatabaseImpl.getSingleton();
    //public static File tankCodeDirectory = new File("./tankCode/");
    public static String compiledTankCodeDirectory = "./compiledTanks/";
    private static String tankClassLoc = "game.board.elements.Tank";

    public static Tank loadTank(ObjectId tankId, String name) {
        try {
            DBTank tank = db.loadDBTank(tankId);
            String code = tank.getCode();
            //int start = code.indexOf("class ") + 6;
            //if (start < 10) {
            int start = code.indexOf("public class ") + 13;
            //}
            int end = code.indexOf(" ", start);
            String nName = code.substring(start, end);
            code = code.replaceAll(nName, name + " ");
            // Take the code out
            // Save it to a file
            JavaFileObject file = new JavaSourceFromString(name, code);



            // Set up variables (classpath) necessary
            JavaCompiler comp = ToolProvider.getSystemJavaCompiler();

            //DiagnosticCollector<JavaFileObject> diagnostics = new DiagnosticCollector<JavaFileObject>();
            //StandardJavaFileManager fileManager = comp.getStandardFileManager(diagnostics, null, null);

            Iterable<? extends JavaFileObject> compilationUnits = Arrays.asList(file);
            //final Iterable<String> options = Arrays.asList( new String[] { "-d", "game/board/elements/"} );
            JavaCompiler.CompilationTask task = comp.getTask(null, null,null,null, null, compilationUnits);

            //for (Diagnostic diagnostic : diagnostics.getDiagnostics())
            //    System.out.format("Error on line %d in %s%n",
            //            diagnostic.getLineNumber(),
            //            diagnostic.getSource().toString());

            //fileManager.close();
            System.err.println(name);
            boolean success = task.call();

            if (success) {
                try {
                    File f = new File(name+".class");
                    System.err.println(f.toURI().toURL());
                    URLClassLoader classLoader = URLClassLoader.newInstance(new URL[]{f.toURI().toURL()});
                    Class<?> cs = Class.forName(name, true, classLoader);
                    Constructor<?> ctor = cs.getConstructor(ObjectId.class, String.class, int.class);
                    Tank t = (Tank) ctor.newInstance(tankId, "My Tank", 3);
                    return t;
                } catch (Exception e) {
                    System.err.format("Reflection failed");
                    e.printStackTrace();
                    return null;
                }
            } else {
                System.err.format("Failed to compile class. Loc: %s%n", name);
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
