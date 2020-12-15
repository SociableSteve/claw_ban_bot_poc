import { Request, Response } from "express";

export default async (_req: Request, res: Response) => {
  res.send(
    `<a href="https://id.twitch.tv/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=http://localhost:8080/login&response_type=code&scope=channel:moderate%20chat:read%20chat:edit%20moderation:read">Click here to connect your Twitch account</a>`
  );
};
