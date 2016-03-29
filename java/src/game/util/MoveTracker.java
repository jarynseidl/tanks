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
    private List<String> listOfErrs;
    private int curTurn;

    public MoveTracker() {
        curTurn = 0;
        listOfMoves = new ArrayList<Map<Integer, TANK_MOVES>>();
        listOfErrs = new ArrayList<String>();
    }

    public void addMove(int tank, TANK_MOVES move) {
        if (curTurn >= listOfMoves.size()) {
            listOfMoves.add(new HashMap<Integer, TANK_MOVES>());
        }
        listOfMoves.get(curTurn).put(tank, move);
    }

    public void addErr(String err){
        listOfErrs.add(err);
    }

    public List<Map<Integer, TANK_MOVES>> getMoves() {
        return listOfMoves;
    }

    public List<String> getErrs(){
        return listOfErrs;
    }

    public void newTurn() {
        curTurn += 1;
    }

}
