package database;

import com.mongodb.MongoClient;
import game.Game;
import org.bson.types.ObjectId;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;

/**
 * Created by ndavis on 11/13/15.
 */
public class GamesDAO extends BasicDAO<Game, ObjectId> {
    public GamesDAO(MongoClient mongoClient, Morphia morphia, String dbName) {
        super(mongoClient, morphia, dbName);
    }
}
