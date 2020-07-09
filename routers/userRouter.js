import express from "express";
import routes from "../routes";

import {
	userDetail,
	getEditProfile,
	postEditProfile,
	getEditPassword,
	postEditPassword,
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);
userRouter.get(routes.editPassword, onlyPrivate, getEditPassword);
userRouter.post(routes.editPassword, onlyPrivate, postEditPassword);
userRouter.get(routes.userDetail(), onlyPrivate, userDetail);

export default userRouter;
