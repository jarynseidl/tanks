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
    private static final String PACKAGE_STR = "package ";
    private static final String SEMICOLON = ";";
    private static final String SL_COMMENT_OPEN = "//";
    private static final String SL_COMMENT_CLOSE = "\n";
    private static final String ML_COMMENT_OPEN = "/*";
    private static final String ML_COMMENT_CLOSE = "*/";
    
    
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
    
    private static String removePackageDeclaration(String code) {
    	
    	// Package statements are required to appear before any import statements
    	// This combined with the edge cases involving Java keywords appearing in
    	// comments has led to the extreme step of simply removing all text from
    	// the source code that precedes the first valid import statement.
    	int slCommentOpen = code.indexOf(SL_COMMENT_OPEN);
    	int slCommentClose = code.indexOf(SL_COMMENT_CLOSE);
    	int mlCommentOpen = code.indexOf(ML_COMMENT_OPEN);
    	int mlCommentClose = code.indexOf(ML_COMMENT_CLOSE);
    	int importIdx = code.indexOf(IMPORT_STR);
    	
    	// Let's go through all of the "import " matches
    	// The first valid one will serve as the new beginning of the code
    	// (everything before it is comments or a package statement)
    	while (importIdx != -1) {
    		
	    	// If there are multiple comments, and the "import " is beyond the end 
	    	// boundaries of these comments, let's find the next comments
	    	// that aren't already over by the "import "
    		//
    		// Second clause is to ensure we don't get stuck here indefinitely
    		// when we run out of comments (location at -1) and importIdx is always
    		// greater than that. Must be an OR or else we'll leave prematurely
    		// by running out of one kind of comment when there are still the 
    		// other kind of comment (single and multi-line)
	    	while ((importIdx > slCommentClose && importIdx > mlCommentClose) &&
	    			(slCommentClose != -1 || mlCommentClose != -1)) {
	    		
	        	slCommentOpen = code.indexOf(SL_COMMENT_OPEN, slCommentOpen+1);
	        	slCommentClose = code.indexOf(SL_COMMENT_CLOSE, slCommentClose+1);
	        	mlCommentOpen = code.indexOf(ML_COMMENT_OPEN, mlCommentOpen+1);
	        	mlCommentClose = code.indexOf(ML_COMMENT_CLOSE, mlCommentClose+1);
	    	}
	    	
	    	// Check to see if this import lies within these comments
	    	if ((importIdx > slCommentOpen && importIdx < slCommentClose) || 
	    			(importIdx > mlCommentOpen && importIdx < mlCommentClose)) {
	    		
	    		// hmmm, this instance of "import " is within a comment, and therefore
	    		// not a valid import statement; let's find the next candidate
	    		importIdx = code.indexOf(IMPORT_STR, importIdx+1);
	    		continue;
	    		
	    	} else {
	    		
	    		// this "import " is not within a comment!
	    		// being the first valid import within the file, we can
	    		// safely remove all text before it 
	    		// (comments and possibly a package statement)
	    		code = code.substring(importIdx);
	    		return code;
	    	}
    	}
    	
    	// Well, if we're still here, it means there were 0 matches for "import "
    	// or they were all within comments. This means this code is destined not
    	// to work anyway because at a minimum, java.util. and game. need to be imported
    	// for a tank to work.
    	//
    	// Anyway, this means there could still be a package statement, but now the
    	// next valid code statement following it is the class declaration, so let's 
    	// remove everything prior to the class declaration.
    	//
    	code = code.substring(code.indexOf(CLASS_STR));
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
