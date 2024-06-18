import express from "express";
import { events } from "../database/data.mjs";
import {
  fetchingEventByQueryParams,
  creatingEventSchema,
} from "../schemas/roleSchemas.mjs";
import { checkSchema } from "express-validator";
import {
  createEventController,
  getEventByIdController,
  filterEventsController,
  updateEventController,
  deleteEventController,
} from "../controller/eventController.mjs";
import { fetchEventByIdMiddleware } from "../middlewares/eventsMidleware.mjs";
const router = express.Router();
router
  .route("/events")
  .get(checkSchema(fetchingEventByQueryParams), filterEventsController)
  .post(checkSchema(creatingEventSchema), createEventController);

router
  .route("/events/:id")
  .get(fetchEventByIdMiddleware, getEventByIdController)
  .put(
    fetchEventByIdMiddleware,
    checkSchema(creatingEventSchema),
    updateEventController
  )
  .delete(fetchEventByIdMiddleware, deleteEventController);

export default router;
