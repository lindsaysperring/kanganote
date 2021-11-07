/**
 * By Paula Santamaría
 * https://dev.to/paulasantamaria/testing-node-js-mongoose-with-an-in-memory-database-32np
 */


const mongoose = require('mongoose');


/**
 * Connect to the in-memory database.
 */
module.exports.connect = async (mongod) => {
    const uri = await mongod.getUri();

    const mongooseOpts = {
        useNewUrlParser: true
    };

    await mongoose.connect(uri, mongooseOpts);
}

/**
 * Drop database, close the connection and stop mongod.
 */
module.exports.closeDatabase = async (mongod) => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

/**
 * Remove all the data for all db collections.
 */
module.exports.clearDatabase = async (mongod) => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}