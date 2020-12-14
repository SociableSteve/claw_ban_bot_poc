import * as mongoose from "mongoose";

const url: string =
  process.env.MONGO_URI || "mongodb://root:example@mongo:27017/banbot";
console.log(url);
mongoose
  .connect(url, {
    authSource: "admin",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((e) => console.log("Error connecting to DB: ", e));

export * from "./user";
export * from "./ban";
