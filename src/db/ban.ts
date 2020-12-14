import * as mongoose from "mongoose";

export interface IBan extends mongoose.Document {
  twitch_name: string;
  twitch_id: string;
}

export const BanSchema = new mongoose.Schema({
  twitch_name: { type: String, required: true },
  twitch_id: { type: String, required: true, unique: true },
});

export const Ban = mongoose.model<IBan>("Ban", BanSchema);
