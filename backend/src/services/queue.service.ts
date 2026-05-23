import { Queue, Worker, Job } from "bullmq";
import redisClient from "../configs/redis.config";
import { logger } from "../utils/logger";
import { webhookEventService } from "../modules/webhooks/webhook.service";

const queueName = "webhook-events";

export const webhookQueue = new Queue(queueName, {
  connection: redisClient,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
  },
});

export const addWebhookEventJob = async (data: {
  id: string;
  provider: string;
  payload: any;
}) => {
  await webhookQueue.add("process-webhook-event", data, {
    jobId: data.id,
  });
};

const worker = new Worker(
  queueName,
  async (job: Job) => {
    logger.info(`Processing job ${job.id} of type ${job.name}`);
    try {
      if (job.name === "process-webhook-event") {
        await webhookEventService.processWebhookEvent(job.data);
      }
    } catch (error) {
      logger.error(`Error processing job ${job.id}:`, error);
      throw error;
    }
  },
  { connection: redisClient },
);

worker.on("completed", (job: Job) => {
  logger.info(`Job ${job.id} has completed`);
});

worker.on("failed", (job: Job | undefined, err: Error) => {
  if (job) {
    logger.error(`Job ${job.id} has failed with ${err.message}`);
  } else {
    logger.error(`A job has failed with ${err.message}`);
  }
});

process.on("SIGINT", async () => {
  await worker.close();
});
