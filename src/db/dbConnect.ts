import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var mongoose: mongoose.Connection; // This must be a `var` and not a `let / const`
}

const MONGODB = {
  APP: {
    URI: `${process.env.MONGODB_APP_URI_PREFIX as string}${process.env.MONGODB_APP_URI as string}?${process.env.MONGODB_APP_URI_QS as string}`,
    USERNAME: process.env.MONGODB_APP_USERNAME as string,
    PASSWORD: process.env.MONGODB_APP_PASSWORD as string,
  },
  DB_NAME: process.env.MONGODB_DBNAME as string,
};

const getConnection = () =>
  mongoose.createConnection(MONGODB.APP.URI, {
    bufferCommands: true,
    user: MONGODB.APP.USERNAME,
    pass: MONGODB.APP.PASSWORD,
    dbName: MONGODB.DB_NAME,
    autoCreate: true,
  }) as mongoose.Connection;

let mongoDb =
  process.env.NODE_ENV === "test" ? getConnection() : global.mongoose;
if (!mongoDb) {
  mongoDb = global.mongoose = getConnection();
}
export { mongoDb };
