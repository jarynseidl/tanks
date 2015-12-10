package game.board.elements;

import game.util.Coordinate;
import game.util.TANK_DIR;
import game.util.TANK_MOVES;
import org.bson.types.ObjectId;
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

    public Tank() {
    }

    public Tank(ObjectId tankID, String tankName, int health) {
        this.tankID = tankID;
        this.tankName = tankName;
        this.health = health;
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
}

