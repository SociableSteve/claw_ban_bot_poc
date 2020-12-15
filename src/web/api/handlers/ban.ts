import { Request, Response } from "express";
import { Ban } from "../../../db";

export default async (_req: Request, res: Response) => {
  res.send(await Ban.find().exec());
};
