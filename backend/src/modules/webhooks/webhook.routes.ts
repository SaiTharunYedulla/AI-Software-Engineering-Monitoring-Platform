import { Router } from "express";
import { webhookController } from "./webhook.controller";

const router = Router();

router.post("/github", webhookController.handleGitHubWebhook);

export const webhookRoutes = router;
