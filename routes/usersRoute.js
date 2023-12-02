import express from "express";

import users from "../controllers/auth/users.js";
import user from "../controllers/auth/user.js";
import createUser from "../controllers/auth/createUser.js";
import updateUser from "../controllers/auth/updateUser.js";
import deleteUser from "../controllers/auth/deleteUser.js";

const usersRouter = express.Router();
usersRouter.route("/").get(users).post(createUser);
usersRouter.route("/:id").get(user).patch(updateUser).delete(deleteUser);

export default usersRouter;
