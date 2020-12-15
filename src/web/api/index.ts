import { Router } from "express";
import ban from "./handlers/ban";

const router = Router();

router.get("/bans", ban);

export default router;
