package game.board.elements;

import game.util.TANK_DIR;
import game.util.TANK_MOVES;
import org.bson.types.ObjectId;

import java.util.List;


public class TenkImplement extends Tank {

    public TenkImplement(ObjectId tankID, String tankName, int health) {
        super(tankID, tankName, health);
    }


    @Override
    public TANK_MOVES calculateTurn(List<Tank> tanks, int size) {
        Return SHOOT;
    }
}
