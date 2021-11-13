import { Router } from "express";
import { SessionController } from "../controllers/SessionController";
import { authUser } from "../middlewares/authUser";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { refreshTokenRequest } from "../requests/RefreshTokenRequest";

const sessionRouter = Router();
const sessionController = new SessionController();

sessionRouter.post("/login", sessionController.login);
sessionRouter.post(
  "/logout",
  refreshTokenRequest,
  ensureAuthenticated,
  sessionController.logout
);
sessionRouter.get("/me", ensureAuthenticated, sessionController.me);
sessionRouter.post(
  "/refresh",
  refreshTokenRequest,
  authUser,
  sessionController.refresh
);

export { sessionRouter };
