import { Router } from "express";
import authenticate from "./handlers/authenticate";
import homepage from "./handlers/homepage";

const router = Router();
router.get("/", homepage);
router.get("/login", authenticate);

export default router;
