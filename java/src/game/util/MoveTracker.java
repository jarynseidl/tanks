package game.util;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Michael Sharp on 12/7/2015.
 */
public class MoveTracker {
    private List<Map<Integer, TANK_MOVES>> listOfMoves;
    private int curTurn;

    public MoveTracker() {
        curTurn = 0;
        listOfMoves = new ArrayList<Map<Integer, TANK_MOVES>>();
    }

    public void addMove(int tank, TANK_MOVES move) {
        if (curTurn >= listOfMoves.size()) {
            listOfMoves.add(new HashMap<Integer, TANK_MOVES>());
        }
        listOfMoves.get(curTurn).put(tank, move);
    }

    public List<Map<Integer, TANK_MOVES>> getMoves() {
        return listOfMoves;
    }

    public void newTurn() {
        curTurn += 1;
    }

}
