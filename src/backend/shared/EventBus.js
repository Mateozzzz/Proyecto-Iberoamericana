export class EventBus {
  constructor() {
    this.handlers = {};
  }

  subscribe(eventType, handler) {
    if (!this.handlers[eventType]) {
      this.handlers[eventType] = [];
    }
    this.handlers[eventType].push(handler);
  }

  async publish(event) {
    const handlers = this.handlers[event.type] || [];
    for (const handler of handlers) {
      await handler(event);
    }
  }
}

// Instancia global simple para arrancar
export const eventBus = new EventBus();

