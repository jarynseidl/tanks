package pregameprocessor;

import database.DBTank;
import database.GameDatabase;
import database.GameDatabaseImpl;
import game.board.elements.Tank;
import game.util.JavaSourceFromString;
import org.bson.types.ObjectId;

import javax.tools.JavaCompiler;
import javax.tools.JavaFileObject;
import javax.tools.ToolProvider;
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
            Iterable<? extends JavaFileObject> compilationUnits = Arrays.asList(file);
            JavaCompiler.CompilationTask task = comp.getTask(null, null, null, null, null, compilationUnits);

            boolean success = task.call();

            if (success) {
                try {
                    URLClassLoader classLoader = URLClassLoader.newInstance(new URL[]{new File("").toURI().toURL()});

                    Class<?> cs = Class.forName(name, true, classLoader);
                    Constructor<?> ctor = cs.getConstructor(ObjectId.class, String.class, int.class);
                    Tank t = (Tank) ctor.newInstance(tankId, "My Tank", 3);
                    return t;
                } catch (Exception e) {
                    System.out.format("Reflection failed");
                    e.printStackTrace();
                    return null;
                }
            } else {
                System.out.format("Failed to compile class. Loc: %s%n", name);
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }
}