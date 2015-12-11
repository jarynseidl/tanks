
import game.board.elements.Tank;
import game.util.TANK_DIR;
import game.util.TANK_MOVES;
import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Embedded;

import java.util.List;

/**
 * Created by ndavis on 11/13/15.
 */
@Embedded
public class Shooter extends Tank {

    public Shooter() {
    }

    public Shooter(ObjectId tankID, String tankName, int health) {
        super(tankID, tankName, health);
    }

    @Override
    public TANK_MOVES calculateTurn(List<Tank> tanks, int size) {
        if (this.getDir() != TANK_DIR.E) {
            return TANK_MOVES.TURN_RIGHT;
        } else {
            return TANK_MOVES.SHOOT;
        }
    }
}



