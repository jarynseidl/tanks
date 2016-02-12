package game.board.elements;

import game.util.Coordinate;
import game.util.LogItem;
import game.util.TANK_DIR;
import game.util.TANK_MOVES;
import org.bson.types.ObjectId;
import game.util.TANK_TYPE;
import game.util.TANK_SKIN;
import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Transient;

import java.util.List;

/**
 * Created by gladi on 11/12/2015.
 */
@Embedded
public abstract class Tank implements BoardElement {
    private Coordinate coord;
    private ObjectId tankID;
    private String tankName;
    private int health;
    private TANK_DIR dir;
    @Transient
    private int alias;
    private int actionPoints;
    private int kills;
    private int deaths;
    private boolean ready;
    @Embedded
    private List<LogItem> errors;
    private TANK_TYPE type;
    private TANK_SKIN skin;
    
    //in case they decide to implement the superclass for some reason
    // it's just the same stats as the BasicTank
    //each tank class has their own ap costs
    // I'm thinking it can then be called in the game class in that big switch?
	private int moveCost = 2;
	private int shootCost = 2;
	private int turnCost = 1;
	private int diagCost = 4;
	private int reloadCost = 4;
	private int damage = 7;

    public Tank() {
    }

    public Tank(ObjectId tankID, String tankName, String tankType) {
        this.tankID = tankID;
        this.tankName = tankName;
        if(tankType.equals("Heavy"))
        	health = 50;
        else if(tankType.equals("Basic"))
        	health = 35;
        else if(tankType.equals("Light"))
        	health = 20;
        else
        	health = 35;
    }

    public abstract TANK_MOVES calculateTurn(List<Tank> tanks, int size);

    @Override
    public final Coordinate getCoord() {
        return this.coord;
    }

    @Override
    public final void setCoord(Coordinate coord) {
        this.coord = coord;
    }

    public final ObjectId getTankID() {
        return tankID;
    }


    public final String getTankName() {
        return tankName;
    }

    public final int getHealth() {
        return health;
    }

    public final void takeDamage(int damage) {
        this.health -= damage;
    }

    public final TANK_DIR getDir() {
        return dir;
    }

    public final void setDir(TANK_DIR dir) {
        this.dir = dir;
    }

    public int getAlias() {
        return alias;
    }

    public void setAlias(int alias) {
        this.alias = alias;
    }
    
    public int getActionPoints() {
    	return actionPoints;
    }

    /*
     * These are the AP cost get statements
     */
    
	public int getMoveCost() {
		return moveCost;
	}

	public int getShootCost() {
		return shootCost;
	}

	public int getTurnCost() {
		return turnCost;
	}

	public int getDiagCost() {
		return diagCost;
	}

	public int getReloadCost() {
		return reloadCost;
	}

	public int getDamage() {
		return damage;
	}
}

