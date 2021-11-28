import "dotenv/config";

import Q from "bull";

import * as jobs from "./jobs";

interface IResponse {
  job: Q.Job<any>;
  res?: any;
}

export default class Queue {
  queues = Object.values(jobs).map((job) => ({
    bull: new Q(job.key, {
      redis: {
        port: Number(process.env.REDIS_PORT),
        host: process.env.REDIS_URL,
        password: process.env.REDIS_PASSWORD,
      },
    }),
    name: job.key,
    handle: job.handle,
    options: job.options,
  }));

  public async add(name: string, data?: any) {
    const queue = this.queues.find((queue) => queue.name === name);

    return queue.bull.add(data, queue.options);
  }

  public process() {
    return this.queues.forEach((queue) => {
      queue.bull.process(queue.handle);

      queue.bull.on("completed", () => {
        console.log("This queue is completed!");
      });

      queue.bull.on("failed", (job, err) => {
        console.log("Job failed", queue.name, job.data);
        console.log(err);
      });
    });
  }
}
