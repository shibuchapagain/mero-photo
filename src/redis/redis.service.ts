import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;

  async onModuleInit() {
    this.client = createClient({
      url: 'redis://localhost:6379',
    });

    this.client.on('error', (err) => console.error('❌ Redis Error:', err));
    await this.client.connect();
    console.log('✅ Redis connected');
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  async set(key: string, value: any, ttl?: number) {
    if (ttl) {
      return this.client.set(key, JSON.stringify(value), { EX: ttl });
    }

    //
    return this.client.set(key, JSON.stringify(value));
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key);
    if (typeof value !== 'string') return null;
    return value ? (JSON.parse(value) as T) : null;
  }

  async del(key: string) {
    return this.client.del(key);
  }

  async publish(channel: string, message: string) {
    return this.client.publish(channel, message);
  }

  async subscribe(channel: string, callback: (message: string) => void) {
    const subscriber = this.client.duplicate();
    await subscriber.connect();
    await subscriber.subscribe(channel, callback);
  }
}
