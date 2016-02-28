package game.user;

import org.bson.types.ObjectId;

/**
 * Created by gladi on 11/12/2015.
 */
public class User {
    private ObjectId userID;
    private String userName;
    private String tankName;
    private ObjectId tankID;
    
    //Values needed for armory
    private int gamesWon = 0;
    private int gamesLost = 0;
    private int draws = 0;
    private int gamesPlayed = 0;
    private int tanksKilled = 0;

    public User() {
    }

    public User(ObjectId userID, String userName, ObjectId tankID, String tankName) {
        this.userID = userID;
        this.userName = userName;
        this.tankID = tankID;
        this.tankName = tankName;
    }

    public ObjectId getUserID() {
        return userID;
    }

    public void setUserID(ObjectId userID) {
        this.userID = userID;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getTankName() {
        return tankName;
    }

    public void setTankName(String tankName) {
        this.tankName = tankName;
    }

    public ObjectId getTankID() {
        return tankID;
    }

    public void setTankID(ObjectId tankID) {
        this.tankID = tankID;
    }
    
	public int getGamesWon() {
		return gamesWon;
	}

	public void incGamesWon() {
		gamesWon++;
		gamesPlayed++;
	}

	public int getGamesLost() {
		return gamesLost;
	}

	public void incGamesLost() {
		gamesLost++;
		gamesPlayed++;
	}

	public int getTanksKilled() {
		return tanksKilled;
	}

	public void incTanksKilled() {
		this.tanksKilled ++;
	}

	public int getDraws() {
		return draws;
	}

	public void incDraws() {
		draws++;
		gamesPlayed++;
	}

	public int getGamesPlayed() {
		return gamesPlayed;
	} 
}
