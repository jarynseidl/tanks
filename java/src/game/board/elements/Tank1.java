
import game.board.elements.Tank;
import game.util.TANK_DIR;
import game.util.TANK_MOVES;
import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Transient;

import java.util.List;

@Embedded
public class Tank1 extends Tank{
    public Tank1(){}
    public Tank1(ObjectId tankID, String tankName, int health){
        super(tankID, tankName, health);
    }
    @Transient
    private List<Tank> tanks;

    @Override
    public TANK_MOVES calculateTurn(List<Tank> tanks, int size){
      this.tanks = tanks;

        if(tankFront(this)){
            return TANK_MOVES.SHOOT;
        }
        else if(tankRight(this)){
            return TANK_MOVES.TURN_RIGHT;
        }
        else if(tankLeft(this)){
            return TANK_MOVES.TURN_LEFT;
        }
        else if(tankBehind(this)){
            if(wallRight(this)){
                return TANK_MOVES.TURN_LEFT;
            }
            else{
                return TANK_MOVES.TURN_RIGHT;
            }
        }
        else if(wallFront(this)){
            if(wallRight(this)){
                return TANK_MOVES.TURN_LEFT;
            }
            else{
                return TANK_MOVES.TURN_RIGHT;
            }
        }
        else{
            return TANK_MOVES.MOVE_FORWARD;
        }
    }

    //whether a tank is north of given tank
    private boolean tankNorth(Tank tank){
      for(int i = 0; i < tanks.size(); ++i){
        if(tanks.get(i).getCoord().getX() == tank.getCoord().getX() &&
           tanks.get(i).getCoord().getY() < tank.getCoord().getY())
          return true;
      }
      return false;
    }

    private boolean tankEast(Tank tank){
        for(int i = 0; i < tanks.size(); ++i){
            if(tanks.get(i).getCoord().getY() == tank.getCoord().getY() &&
               tanks.get(i).getCoord().getX() > tank.getCoord().getX())
                return true;
        }
        return false;
    }

    private boolean tankSouth(Tank tank){
      for(int i = 0; i < tanks.size(); ++i){
      if(tanks.get(i).getCoord().getX() == tank.getCoord().getX() &&
         tanks.get(i).getCoord().getY() > tank.getCoord().getY())
          return true;
      }
      return false;
    }

    private boolean tankWest(Tank tank){
      for(int i = 0; i < tanks.size(); ++i){
      if(tanks.get(i).getCoord().getY() == tank.getCoord().getY() &&
         tanks.get(i).getCoord().getX() < tank.getCoord().getX())
          return true;
      }
      return false;
    }

    //whether a tank is in front of given tank
    private boolean tankFront(Tank tank){
      return(((tank.getDir() == TANK_DIR.N) && tankNorth(tank)) ||
               ((tank.getDir() == TANK_DIR.E) && tankEast(tank)) ||
               ((tank.getDir() == TANK_DIR.S) && tankSouth(tank)) ||
               ((tank.getDir() == TANK_DIR.W) && tankWest(tank)));
    }

    private boolean tankRight(Tank tank){
        return(((tank.getDir() == TANK_DIR.N) && tankEast(tank)) ||
               ((tank.getDir() == TANK_DIR.E) && tankSouth(tank)) ||
               ((tank.getDir() == TANK_DIR.S) && tankWest(tank)) ||
               ((tank.getDir() == TANK_DIR.W) && tankNorth(tank)));
    }

    private boolean tankBehind(Tank tank){
        return(((tank.getDir() == TANK_DIR.N) && tankSouth(tank)) ||
               ((tank.getDir() == TANK_DIR.E) && tankWest(tank)) ||
               ((tank.getDir() == TANK_DIR.S) && tankNorth(tank)) ||
               ((tank.getDir() == TANK_DIR.W) && tankEast(tank)));
    }

    private boolean tankLeft(Tank tank){
        return(((tank.getDir() == TANK_DIR.N) && tankWest(tank)) ||
               ((tank.getDir() == TANK_DIR.E) && tankNorth(tank)) ||
               ((tank.getDir() == TANK_DIR.S) && tankEast(tank)) ||
               ((tank.getDir() == TANK_DIR.W) && tankSouth(tank)));
    }

    //whether a wall is directly in front of given tank
    private boolean wallFront(Tank tank){
        return(((tank.getCoord().getY() == 0) && (tank.getDir() == TANK_DIR.N)) ||
               ((tank.getCoord().getX() == 9) && (tank.getDir() == TANK_DIR.E)) ||
               ((tank.getCoord().getY() == 9) && (tank.getDir() == TANK_DIR.S)) ||
               ((tank.getCoord().getX() == 0) && (tank.getDir() == TANK_DIR.W)));
    }

    private boolean wallRight(Tank tank){
        return(((tank.getCoord().getY() == 0) && (tank.getDir() == TANK_DIR.W)) ||
               ((tank.getCoord().getX() == 9) && (tank.getDir() == TANK_DIR.N)) ||
               ((tank.getCoord().getY() == 9) && (tank.getDir() == TANK_DIR.E)) ||
               ((tank.getCoord().getX() == 0) && (tank.getDir() == TANK_DIR.S)));
    }

    private boolean wallBehind(Tank tank){
        return(((tank.getCoord().getY() == 0) && (tank.getDir() == TANK_DIR.S)) ||
               ((tank.getCoord().getX() == 9) && (tank.getDir() == TANK_DIR.W)) ||
               ((tank.getCoord().getY() == 9) && (tank.getDir() == TANK_DIR.N)) ||
               ((tank.getCoord().getX() == 0) && (tank.getDir() == TANK_DIR.E)));
    }

    private boolean wallLeft(Tank tank){
        return(((tank.getCoord().getY() == 0) && (tank.getDir() == TANK_DIR.E)) ||
               ((tank.getCoord().getX() == 9) && (tank.getDir() == TANK_DIR.S)) ||
               ((tank.getCoord().getY() == 9) && (tank.getDir() == TANK_DIR.W)) ||
               ((tank.getCoord().getX() == 0) && (tank.getDir() == TANK_DIR.N)));
    }
}
