import express from "express";

import { getAllUser, getUser, createUser, updateUser, deleteUser } from "../controllers/auth/usersController.js";

const usersRouter = express.Router();
usersRouter.route("/").get(getAllUser).post(createUser);
usersRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default usersRouter;
