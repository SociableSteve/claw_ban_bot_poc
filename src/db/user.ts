import * as mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  twitch_name: string;
  twitch_id: string;
  access_token: string;
  expiry: string;
  refresh_token: string;
}

export const UserSchema = new mongoose.Schema({
  twitch_name: { type: String, required: true },
  twitch_id: { type: String, required: true, unique: true },
  access_token: { type: String, required: true },
  expiry: { type: String, required: true },
  refresh_token: { type: String, required: true },
});

export const User = mongoose.model<IUser>("User", UserSchema);
