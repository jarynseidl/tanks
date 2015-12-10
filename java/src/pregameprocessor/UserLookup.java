package pregameprocessor;

import database.DBTank;
import database.DBUser;
import database.GameDatabase;
import database.GameDatabaseImpl;
import game.Game;
import game.user.User;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by nathand on 11/28/15.
 */
public class UserLookup {

    public static GameDatabase db = GameDatabaseImpl.getSingleton();
    /**
     * Take a gameId and look up the Users and save them to the game in the database
     * @param gameId
     *
     * Specifically, this will take a game with {tankIds: ["675fsdf987", etc]}
     * and populate the users {users: [{username: "frank", tankid: "675fsdf987"}, etc]}
     * for that game and save it to the database
     */
    public static Game processGame(ObjectId gameId) {

        Game game = db.loadGame(gameId);
        List<ObjectId> tankIds = game.getTankIds();

        List<User> users = new ArrayList<>();
        // Look up each tankID and get the user info
        for (ObjectId tankId: tankIds) {
            users.add(lookUpUserFromTankId(tankId));
        }

        // Add those users to the game
        game.setUsers(users);

        // save the game
        db.saveGame(game);
        return game;
    }

    public static Game processGame(Game game) {
        List<ObjectId> tankIds = game.getTankIds();

        List<User> users = new ArrayList<>();
        // Look up each tankID and get the user info
        for (ObjectId tankId : tankIds) {
            users.add(lookUpUserFromTankId(tankId));
        }

        // Add those users to the game
        game.setUsers(users);

        return game;
    }

    public static User lookUpUserFromTankId(ObjectId tankId) {

        User user = new User();
        DBUser dbUser = db.findDBUserByTankId(tankId);

        user.setTankID(tankId);
        for (DBTank dbt: dbUser.getTanks()) {
            if (dbt.getId().equals(tankId)) {
                user.setTankName(dbt.getName());
                break;
            }
        }
        user.setUserName(dbUser.getUsername());
        user.setUserID(dbUser.getId());

        return user;
    }

}
