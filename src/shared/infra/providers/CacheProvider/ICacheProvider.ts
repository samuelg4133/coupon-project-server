export default interface ICacheProvider {
  save(key: string, value: any): Promise<void>;
  recover<T>(key: string): Promise<T | null>;
  delete(key: string): Promise<void>;
  removePrefix(prefix: string): Promise<void>;
}
