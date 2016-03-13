package database;

import game.util.LogItem;
import game.util.TANK_SKIN;
import game.util.TANK_STATUS;
import game.util.TANK_TYPE;
import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Id;

import java.util.List;

/**
 * Created by nathand on 11/28/15.
 */
public class DBTank {

    @Id
    private ObjectId id;
    private String name;
    private String code;
    private TANK_STATUS status;
    private TANK_TYPE type;
    private TANK_SKIN skin;
    private int kills;
    private int deaths;
    private int wins;
    private List<LogItem> errors;


    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getKills() {
        return kills;
    }

    public void setKills(int kills) {
        this.kills = kills;
    }

    public int getDeaths() {
        return deaths;
    }

    public void setDeaths(int deaths) {
        this.deaths = deaths;
    }

    public int getWins() {
        return wins;
    }

    public void setWins(int wins) {
        this.wins = wins;
    }

    public void addDeaths(int deaths) {
        this.deaths += deaths;
    }

    public void addWins(int wins) {
        this.wins += wins;
    }

    public void addKills(int kills) {
        this.kills += kills;
    }

}
