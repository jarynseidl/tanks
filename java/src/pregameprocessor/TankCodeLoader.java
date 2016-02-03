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
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by nathand on 12/1/15.
 */
public class TankCodeLoader {

	// public members
	//public static File tankCodeDirectory = new File("./tankCode/");
    public static GameDatabase db = GameDatabaseImpl.getSingleton();
    public static String compiledTankCodeDirectory = "./compiledTanks/";
    
    // private members
    private static String tankClassLoc = "game.board.elements.Tank";
    private static final String CLASS_STR = "public class ";
    private static final String IMPORT_STR = "import ";
    private static final String SEMICOLON = ";";
    
    // approved Java package name patterns
    private static final String[] APPROVED_PACKAGES = {
    	"\\s*game.*",
    	"\\s*org\\.bson.*",
    	"\\s*org\\.mongodb.*",
    	"\\s*java\\.util.*"
    };

    public static Tank loadTank(ObjectId tankId, String name) {
        try {
        	
        	// get info and tank code text
            DBTank tank = db.loadDBTank(tankId);
            String code = tank.getCode();
            
            // parse the code and sanitize it
            code = replaceTankClassName(code, name);
            code = removeUnapprovedImports(code);
            System.out.println(code);

            // Take the code out
            // Save it to a file
            JavaFileObject file = new JavaSourceFromString(name, code);

            // Set up variables (classpath) necessary
            JavaCompiler comp = ToolProvider.getSystemJavaCompiler();

            //DiagnosticCollector<JavaFileObject> diagnostics = new DiagnosticCollector<JavaFileObject>();
            //StandardJavaFileManager fileManager = comp.getStandardFileManager(diagnostics, null, null);

            Iterable<? extends JavaFileObject> compilationUnits = Arrays.asList(file);

            StandardJavaFileManager fileManager = comp.getStandardFileManager( null, null, null);
            fileManager.setLocation(StandardLocation.CLASS_OUTPUT,Arrays.asList(new File("src")));
            JavaCompiler.CompilationTask task = comp.getTask(null, fileManager,null,null, null, compilationUnits);

            //for (Diagnostic diagnostic : diagnostics.getDiagnostics())
            //    System.out.format("Error on line %d in %s%n",
            //            diagnostic.getLineNumber(),
            //            diagnostic.getSource().toString());

            //fileManager.close();
            //System.err.println(name);
            boolean success = task.call();

            if (success) {
                try {
                    File f = new File("src");
                    //System.err.println(f.toURI().toURL());
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
    
    //
    // Private methods
    //
    
    private static String replaceTankClassName(String code, String tankName) {
    	
    	// find the class declaration
        int start = code.indexOf(CLASS_STR) + CLASS_STR.length();
        int end = code.indexOf(" ", start);
        String nName = code.substring(start, end);
        
        // replace provided classname with unique identifying one from us
        code = code.replaceAll(nName, tankName + " ");
        return code;
    }
    
    private static String removeUnapprovedImports(String code) {
    	
    	// pre-compile regex patterns for acceptable package names
    	Pattern[] packagePatterns = new Pattern[APPROVED_PACKAGES.length];
    	for(int i=0; i<APPROVED_PACKAGES.length; i++) {
    		packagePatterns[i] = Pattern.compile(APPROVED_PACKAGES[i]);
    	}
    	
    	// find each import statement
        int start = 0;
        int packageIdx = 0;
        int end = 0;
        int lastImport = 0;
        while (start != -1) {
        	
        	// identify substring location
        	start = code.indexOf(IMPORT_STR, lastImport);
        	packageIdx = start + IMPORT_STR.length();
        	end = code.indexOf(SEMICOLON, packageIdx);
        	
        	// stop searching if we're out of imports
        	if (start == -1) {
        		break;
        	}
        	
        	// extract package name, and check it for approval
        	String packageInQuestion = code.substring(packageIdx, end);
        	boolean packageApproved = false;
        	for(int i=0; i<packagePatterns.length; i++) {
        		Matcher match = packagePatterns[i].matcher(packageInQuestion);
        		if (match.find()) {
        			packageApproved = true;
        			break;
        		}
        	}
        	
        	// remove the package declaration if it is NOT approved
        	// set the "checked up to" index to either the end of this import
        	// or to where we removed it from appropriately
        	if (!packageApproved) {
        		code = code.replace(code.substring(start, end+1), "");
        		lastImport = start;
        	} else {
        		lastImport = end;
        	}
        }
        
        return code;
    }
}
