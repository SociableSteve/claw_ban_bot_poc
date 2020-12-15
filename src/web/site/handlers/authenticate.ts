import axios from "axios";
import { Request, Response } from "express";
import { DateTime } from "luxon";
import { ApiClient, StaticAuthProvider } from "twitch";
import { User } from "../../../db";

export default async (req: Request, res: Response) => {
  try {
    const response = await axios.post(
      "https://id.twitch.tv/oauth2/token",
      {},
      {
        params: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          code: req.query.code,
          grant_type: "authorization_code",
          redirect_uri: "http://localhost:8080/login",
        },
      }
    );
    const { access_token, expires_in, refresh_token } = response.data;
    const authProvider = new StaticAuthProvider(
      process.env.CLIENT_ID,
      access_token
    );
    const api = new ApiClient({ authProvider });
    const me = await api.helix.users.getMe();

    let expiry = DateTime.local().plus({ seconds: expires_in }).toISO();
    await User.updateOne(
      { twitch_id: me.id },
      {
        $set: {
          access_token,
          expiry,
          refresh_token,
          twitch_name: me.displayName,
          twitch_id: me.id,
        },
      },
      { upsert: true }
    ).exec();

    res.send(`Connected as ${me.displayName}`);
  } catch (e) {
    res.send(
      `OHNOES! Something went wrong 😭. Try again? <a href="https://id.twitch.tv/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=http://localhost:8080/login&response_type=code&scope=channel:moderate%20chat:read">Click here to connect your Twitch account</a>`
    );
  }
};
