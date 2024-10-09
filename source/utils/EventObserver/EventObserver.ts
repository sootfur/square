export class EventObserver {
  private listeners: Map<string, any> | null;

  constructor() {
    this.listeners = new Map();
  }

  public hasListener(key: string): boolean {
    return this.listeners.has(key);
  }

  public addListener(key: string, callback: any): void {
    if (!this.hasListener(key)) {
      this.listeners.set(key, [callback]);
    } else {
      this.listeners.set(key, [...this.listeners.get(key), callback]);
    }
  }

  public removeListener(key: string): void {
    if (this.hasListener(key)) {
      this.listeners.delete(key);
    }
  }

  public startListener(key: string): void {
    if (this.hasListener(key)) {
      const listeners = this.listeners.get(key);

      listeners[listeners.length - 1]();
      /* listeners.forEach((listener: any) => {
        listener();
      }); */
    }
  }

  public clearListeners(): void {
    this.listeners = null;
  }
}
