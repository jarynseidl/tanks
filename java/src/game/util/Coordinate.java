package game.util;

import org.mongodb.morphia.annotations.Embedded;

/**
 * Created by gladi on 11/12/2015.
 */
@Embedded
public class Coordinate {
    int x;
    int y;

    public Coordinate() {
    }

    public Coordinate(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public void setX(int x) {
        this.x = x;
    }

    public void setY(int y) {
        this.y = y;
    }
}
