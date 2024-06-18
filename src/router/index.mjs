import express, { Router } from "express";
import eventsRoutes from "./eventsRoutes.mjs";
import usersRoutes from "./usersRoutes.mjs";

const router = Router();
router.use(usersRoutes);
router.use(eventsRoutes);

export default router;
