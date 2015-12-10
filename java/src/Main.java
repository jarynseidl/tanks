import poller.Poller;

/**
 * Created by gladi on 11/12/2015.
 */
public class Main {
    public static void main(String[] args) {
        try {
            Poller p = new Poller(5000);
        } catch (Exception e) {
            System.out.printf("Thread shut down with exception: %s%n", e);
        }


    }
}
