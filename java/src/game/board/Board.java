package game.board;

import game.board.elements.BoardElement;
import game.board.elements.Tank;
import game.util.Coordinate;
import org.mongodb.morphia.annotations.Embedded;

/**
 * Created by ndavis on 11/14/15.
 */
@Embedded
public interface Board {

    public BoardElement getElementAt(Coordinate coord);

    public BoardElement getElementAt(int x, int y);

    void setElementAt(int x, int y, BoardElement element);

    void addTank(Tank t, int which);

    public int getSize();

}
