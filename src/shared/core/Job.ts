import { JobOptions, ProcessCallbackFunction } from "bull";

export default interface Job<T> {
  key: string;
  options?: JobOptions;
  handle(data?: any): Promise<T>;
}
