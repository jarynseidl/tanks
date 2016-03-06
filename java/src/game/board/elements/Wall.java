package game.board.elements;

import game.util.Coordinate;

import org.mongodb.morphia.annotations.Embedded;

/**
 * Created by gladi on 11/12/2015.
 */
@Embedded
public class Wall implements BoardElement {
    private Coordinate coord;
    
    //this is the passphrase used to prevent the user from updating their own wins, coordinates, or dir
    private String statsPassword = "poekillsKylo33#d@rn";

    public Wall() {

    }

    @Override
    public Coordinate getCoord() {
        return this.coord;
    }

    @Override
    public void setCoord(Coordinate coord, String passphrase) {
    	if(passphrase.equals(statsPassword))
    		this.coord = coord;
    }
}
