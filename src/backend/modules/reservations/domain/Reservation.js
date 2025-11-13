export class Reservation {
  constructor({ id, sku, qty, advisorId, status = "CREATED", createdAt = new Date() }) {
    this.id = id;
    this.sku = sku;
    this.qty = qty;
    this.advisorId = advisorId;
    this.status = status;
    this.createdAt = createdAt;
  }
}

