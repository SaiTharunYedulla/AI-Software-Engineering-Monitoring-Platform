import { Request, Response } from "express";
import { webhookEventService } from "./webhook.service";
import { logger } from "../../utils/logger";

export const webhookController = {
  async handleGitHubWebhook(req: Request, res: Response) {
    try {
      const signature = req.headers["x-hub-signature-256"] as string;
      const event = req.headers["x-github-event"] as string;
      const payload = req.body;

      // The raw body is needed for signature verification
      const rawPayload = (req as any).rawBody;

      logger.info(`Received GitHub webhook event: ${event}`);

      await webhookEventService.handleWebhookEvent(
        "github",
        payload,
        signature,
        rawPayload,
      );

      res.status(200).send("OK");
    } catch (error) {
      logger.error("Error handling GitHub webhook:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};
