package game.board;

import game.board.elements.BoardElement;
import game.board.elements.Tank;
import game.util.Coordinate;
import game.util.TANK_DIR;

import org.mongodb.morphia.annotations.Embedded;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by ndavis on 11/14/15.
 */
@Embedded
public class SquareBoardImpl implements Board {
    private List<List<BoardElement>> board;
    private int size;

    //this is the passphrase used to prevent the user from updating their own wins, coordinates, or dir
    private String statsPassword = "poekillsKylo33#d@rn";
    
    public SquareBoardImpl(int size) {

        this.size = size;

        // Initialize the board with nulls
        board = new ArrayList<List<BoardElement>>();
        for (int x = 0; x < size; x++) {
            board.add(new ArrayList<BoardElement>());
            for (int y = 0; y < size; y++) {
                board.get(x).add(null);
            }
        }
    }

    public void addTank(Tank t, int which) {
        switch (which) {
            case 0:
                setElementAt(0, 0, t);
                t.setDir(TANK_DIR.S, statsPassword);
                t.setCoord(new Coordinate(0, 0), statsPassword);
                break;
            case 1:
                setElementAt(size - 1, size - 1, t);
                t.setDir(TANK_DIR.N, statsPassword);
                t.setCoord(new Coordinate(size - 1, size - 1), statsPassword);
                break;
            case 2:
                setElementAt(size - 2, 1, t);
                t.setDir(TANK_DIR.N, statsPassword);
                t.setCoord(new Coordinate(size - 2, 1), statsPassword);
                break;
            case 3:
                setElementAt(1, size - 2, t);
                t.setDir(TANK_DIR.S, statsPassword);
                t.setCoord(new Coordinate(1, size - 2), statsPassword);
                break;
        }
    }

    @Override
    public BoardElement getElementAt(int x, int y) {
        return board.get(x).get(y);
    }

    @Override
    public BoardElement getElementAt(Coordinate coord) {
        return getElementAt(coord.getX(), coord.getY());
    }

    @Override
    public void setElementAt(int x, int y, BoardElement element) {
        board.get(x).set(y, element);
    }

    @Override
    public int getSize() {
        return this.size;
    }
}
