tanks
=======

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

