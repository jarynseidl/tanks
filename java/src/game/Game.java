package game;

import game.board.Board;
import game.board.SquareBoardImpl;
import game.board.elements.BoardElement;
import game.board.elements.Tank;
import game.user.User;
import game.util.Coordinate;
import game.util.MoveTracker;
import game.util.TANK_MOVES;
import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Transient;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by gladi on 11/12/2015.
 */
@Entity("games")
public class Game {
    @Id
    private ObjectId id;
    @Embedded
    private List<User> users;
    @Embedded
    private String name;
    @Embedded
    private List<Tank> tanks;
    private List<ObjectId> tankIds;
    @Transient
    private Board board;
    private ObjectId winnerID;
    @Transient
    private int boardSize = 10;
    @Transient
    private List<Tank> ttanks;
    @Embedded
    private MoveTracker moves;
    @Transient
    private int currentTurn = 0;
    @Transient
    private int maxTurns = 1000;
    public boolean ready;
    private int status;
    
    //this is where to get the error codes from
    private String compFailureResponse = "";
    
    //this is the passphrase used to prevent the user from updating their own wins
    private String statsPassword = "poekillsKylo33#d@rn";

    public Game() {
        this.moves = new MoveTracker();
        this.users = new ArrayList<User>();
        this.tanks = new ArrayList<Tank>();
        this.board = new SquareBoardImpl(boardSize);
    }

    public Game(List<User> user, List<Tank> tanks, Board board) {
        this.moves = new MoveTracker();
        this.users = user;

        this.tanks = tanks;
        this.board = board;
    }

    public void startGame() {
        for (int i = 0; i < tanks.size(); i++) {
            board.addTank(tanks.get(i), i);
            tanks.get(i).setAlias(i);
        }
        TANK_MOVES move;

        while (tanks.size() > 1) {
            ttanks = new ArrayList<Tank>();

            for (Tank t : tanks) {
                if (ttanks.contains(t))
                    continue;
                try {
                    move = t.calculateTurn(Collections.unmodifiableList(tanks), boardSize);
                    switch (move) {
                        case SHOOT:
                            shoot(t);
                            break;
                        case TURN_RIGHT:
                            t.setDir(t.getDir().rotateRight(t.getDir()));
                            break;
                        case TURN_LEFT:
                            t.setDir(t.getDir().rotateLeft(t.getDir()));
                            break;
                        case WAIT:
                            break;
                        case MOVE_FORWARD:
                            move = move(t, true, move);
                            break;
                        case MOVE_BACKWARD:
                            move = move(t, false, move);
                            break;
                    }
                    moves.addMove(t.getAlias(), move);
                } catch (Exception e) {
                    // Send the output of e to the user for debugging
                    moves.addMove(t.getAlias(), TANK_MOVES.WAIT);
                }
            }
            moves.newTurn();
            currentTurn += 1;


            for (int i = 0; i < ttanks.size(); i++) {
                tanks.remove(ttanks.get(i));
            }

            if (currentTurn > maxTurns) {
            	for (Tank t: tanks){
            		t.incDraws("statsPassword");
            	}
                return;
            }
        }
        Tank t = tanks.get(0);
        ObjectId id = new ObjectId();
        for (int i = 0; i < users.size(); i++) {
            if (users.get(i).getTankID() == t.getTankID()) {
                id = users.get(i).getUserID();
                users.get(i).incGamesWon();
                t.incGamesWon("statsPassword");
            }
            
            else
            	users.get(i).incGamesLost();
        }
        winnerID = id;

    }

    private TANK_MOVES move(Tank t, boolean forward, TANK_MOVES move) {
        int x = t.getCoord().getX();
        int y = t.getCoord().getY();
        switch (t.getDir()) {
            case N:
                if (forward)
                    y -= 1;
                else
                    y += 1;
                break;
            case E:
                if (forward)
                    x += 1;
                else
                    x -= 1;
                break;
            case S:
                if (forward)
                    y += 1;
                else
                    y -= 1;
                break;
            case W:
                if (forward)
                    x -= 1;
                else
                    x += 1;
                break;
        }
        if (y < 0 || y > boardSize || x < 0 || x > boardSize) {

            return TANK_MOVES.WAIT;
        } else {
            if (board.getElementAt(x, y) != null) {
                return TANK_MOVES.WAIT;
            }

            board.setElementAt(t.getCoord().getX(), t.getCoord().getY(), null);
            t.setCoord(new Coordinate(x, y));
            board.setElementAt(x, y, t);
            return move;

        }
    }

    private void shoot(Tank t) {
        switch (t.getDir()) {
            case N:
                for (int i = t.getCoord().getY(); i >= 0; i--) {
                    BoardElement elem = board.getElementAt(t.getCoord().getX(), i);
                    if (elem != null && (Tank) elem != t) {
                        ((Tank) elem).takeDamage(t.getDamage());
                        if (((Tank) elem).getHealth() == 0) {
                        	((Tank) elem).incGamesLost("statsPassword");
                            ttanks.add((Tank) elem);
                            board.setElementAt(t.getCoord().getX(), i, null);
                            for (int f = 0; f < users.size(); f++) {
                                if (users.get(f).getTankID() == t.getTankID()) {
                                    users.get(f).incTanksKilled();
                                    t.incTanksKilled("statsPassword");
                                }
                            }
                        }

                        break;
                    }
                }
                break;
            case E:
                for (int i = t.getCoord().getX(); i < board.getSize(); i++) {
                    BoardElement elem = board.getElementAt(i, t.getCoord().getY());
                    if (elem != null && (Tank) elem != t) {
                        ((Tank) elem).takeDamage(t.getDamage());
                        if (((Tank) elem).getHealth() == 0) {
                        	((Tank) elem).incGamesLost("statsPassword");
                            ttanks.add((Tank) elem);
                            board.setElementAt(i, t.getCoord().getY(), null);
                            for (int f = 0; f < users.size(); f++) {
                                if (users.get(f).getTankID() == t.getTankID()) {
                                    users.get(f).incTanksKilled();
                                    t.incTanksKilled("statsPassword");
                                }
                            }
                        }
                        break;
                    }
                }
                break;
            case S:
                for (int i = t.getCoord().getY(); i < board.getSize(); i++) {
                    BoardElement elem = board.getElementAt(t.getCoord().getX(), i);
                    if (elem != null && (Tank) elem != t) {
                        ((Tank) elem).takeDamage(t.getDamage());
                        if (((Tank) elem).getHealth() == 0) {
                        	((Tank) elem).incGamesLost("statsPassword");
                            ttanks.add((Tank) elem);
                            board.setElementAt(t.getCoord().getX(), i, null);
                            for (int f = 0; f < users.size(); f++) {
                                if (users.get(f).getTankID() == t.getTankID()) {
                                    users.get(f).incTanksKilled();
                                    t.incTanksKilled("statsPassword");
                                }
                            }
                        }
                        break;
                    }
                }
                break;
            case W:
                for (int i = t.getCoord().getX(); i >= 0; i--) {
                    BoardElement elem = board.getElementAt(i, t.getCoord().getY());
                    if (elem != null && (Tank) elem != t) {
                        ((Tank) elem).takeDamage(t.getDamage());
                        if (((Tank) elem).getHealth() == 0) {
                        	((Tank) elem).incGamesLost("statsPassword");
                            ttanks.add((Tank) elem);
                            board.setElementAt(i, t.getCoord().getY(), null);
                            for (int f = 0; f < users.size(); f++) {
                                if (users.get(f).getTankID() == t.getTankID()) {
                                    users.get(f).incTanksKilled();
                                    t.incTanksKilled("statsPassword");
                                }
                            }
                        }
                        break;
                    }
                }
                break;
        }
    }

    public ObjectId getId() {
        return id;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }

    public List<Tank> getTanks() {
        return tanks;
    }

    public void setTanks(List<Tank> tanks) {
        this.tanks = tanks;
    }

    public Board getBoard() {
        return board;
    }

    public void setBoard(Board board) {
        this.board = board;
    }

    public ObjectId getWinnerID() {
        return winnerID;
    }

    private void setWinnerID(ObjectId winnerID) {
        this.winnerID = winnerID;
    }

    public List<ObjectId> getTankIds() {
        return tankIds;
    }

    public void createMoveTracker() {
        this.moves = new MoveTracker();
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

	public String getCompFailureResponse() {
		return compFailureResponse;
	}

	public void setCompFailureResponse(String compFailureResponse) {
		this.compFailureResponse = compFailureResponse;
	}
    
    
}


