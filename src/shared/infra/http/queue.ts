import "dotenv/config";

import Queue from "../queue/bull";

const q = new Queue();

q.process();

console.log("Queue is running");
