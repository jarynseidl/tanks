package database;

import com.mongodb.MongoClient;
import game.user.User;
import org.bson.types.ObjectId;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;

import java.util.List;

/**
 * Created by nathand on 11/28/15.
 */
public class UserDAO extends BasicDAO<DBUser, ObjectId> {
    public UserDAO(MongoClient mongoClient, Morphia morphia, String dbName) {
        super(mongoClient, morphia, dbName);
    }

    public void updateStats(List<User> users) {
        for (User user : users){
            DBUser player = this.get(user.getUserID());
            player.addDeaths(user.getGamesLost());
            player.addKills(user.getTanksKilled());
            player.addWins(user.getGamesWon());

            List<DBTank> dbtanks = player.getTanks();
            for (DBTank tank : dbtanks) {
                if(tank.getId()==user.getTankID()){
                    tank.addDeaths(user.getGamesLost());
                    tank.addKills(user.getTanksKilled());
                    tank.addWins(user.getGamesWon());
                }
            }

            this.save(player);
        }
    }
}

