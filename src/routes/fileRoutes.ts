import { Router } from "express";
import { getFileData } from "../controllers/fileController";

const router = Router();

router.get("/api/files", getFileData);

export default router;
