Install:
--------

First, get Node.js from [here](https://nodejs.org/en/), which comes with the ```npm ``` package. Then run:
```bash
npm install # installs all the node and gulp dependencies
```

Compile:
--------

If you don't already have the ```gulp``` package, install it with:
```bash
sudo npm install -g gulp
```
... then compile by running:
```bash
gulp browserify # compile the javascript sources
```

Run:
----

To run it, you'll need MongoDB, which you can install from [here](https://docs.mongodb.org/manual/installation/) if you don't already have it. Then:
```bash
mongod --config mongod.conf # starts mongo on default port 27017
node server.js # starts node on default port 3000
```

To run the java engine, run ```java/src/Main.java``` with everything from ```java/lib``` in the classpath. On the aws server we run the following nasty long commands from the ```java``` directory. However, it can be simplified in an IDE.

```
javac -classpath lib/morphia-1.0.1.jar:lib/bson-3.0.4.jar:lib/mongodb-driver-3.0.4.jar:lib/mongodb-driver-core-3.1.1.jar:lib/gson-2.4.jar:src src/Main.java
java -classpath lib/morphia-1.0.1.jar:lib/bson-3.0.4.jar:lib/mongodb-driver-3.0.4.jar:lib/mongodb-driver-core-3.1.1.jar:lib/gson-2.4.jar:src Main
```

Errors:
-------

If you get an error trying to run the server at the end, the first thing to check would be if MongoDB is actually running. Try running:
```bash
mongod
```
... which should open a Mongo shell. If it quits and errors out, your issue is probably with running the database conenction. If you have ```nmap``` installed, try scanning your computer with:
```bash
sudo nmap -p 27017 localhost
```
... and check that the mongod port is open. If the database is working, you might try rebuilding any directories that are thrown in the server error. For an example, see [this bug report](https://github.com/polotek/libxmljs/issues/253) and the solution down the page mentioning the ```node-gyp``` command. For example, if the server error mentions not being able to find the bcrypt library, try running the ```node-gyp rebuild``` command within the bcrypt subdirectory.
