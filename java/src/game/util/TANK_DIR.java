package game.util;

/**
 * Created by Michael on 11/13/2015.
 */
public enum TANK_DIR {
    N, E, S, W;

    public TANK_DIR rotateRight(TANK_DIR dir) {
        return values()[(ordinal() + 1) % 4];
    }

    public TANK_DIR rotateLeft(TANK_DIR dir) {
        return values()[(ordinal() - 1) % 4];
    }
}
