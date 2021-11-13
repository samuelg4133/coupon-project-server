import Redis from "ioredis";

import cacheConfig from "@config/cache";

import ICacheProvider from "./ICacheProvider";

export default class RedisCacheProvider implements ICacheProvider {
  private _client: Redis.Redis;
  constructor() {
    this._client = new Redis(cacheConfig.config.redis);
  }
  public async removePrefix(prefix: string): Promise<void> {
    const keys = await this._client.keys(`${prefix}:*`);

    const pipeline = this._client.pipeline();

    keys.forEach((key) => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
  public async save(key: string, value: any): Promise<void> {
    await this._client.set(key, JSON.stringify(value));
  }
  public async recover<T>(key: string): Promise<T | null> {
    const data = await this._client.get(key);

    return data ? (JSON.parse(data) as T) : null;
  }
  public async delete(key: string): Promise<void> {
    await this._client.del(key);
  }
}
