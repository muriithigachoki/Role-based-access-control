import { Router } from "express";
import { checkSchema } from "express-validator";
import { userControllers } from "../controller/usersController.mjs";
import { userSchemas } from "../schemas/usersSchemas.mjs";
import { fetchuserByIdMiddleware } from "../middlewares/usersMiddleware.mjs";

const router = Router();

router
  .route("/users")
  .get(userControllers.filterUsersController)
  .post(
    checkSchema(userSchemas.createUserSchema),
    userControllers.createUserController
  );

router
  .route("/users/:id")
  .get(fetchuserByIdMiddleware, userControllers.getuserByIdController)
  .put(
    fetchuserByIdMiddleware,
    checkSchema(userSchemas.createUserSchema),
    userControllers.updateUserController
  )
  .delete(fetchuserByIdMiddleware, userControllers.deleteuserController);
export default router;
