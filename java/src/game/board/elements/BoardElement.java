package game.board.elements;

import game.util.Coordinate;
import org.mongodb.morphia.annotations.Embedded;

/**
 * Created by gladi on 11/12/2015.
 */
@Embedded
public interface BoardElement {
    public Coordinate getCoord();

    public void setCoord(Coordinate coord);
}
