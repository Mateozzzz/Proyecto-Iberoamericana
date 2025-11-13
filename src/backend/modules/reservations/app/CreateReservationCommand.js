export class CreateReservationCommand {
  constructor({ sku, qty, advisorId }) {
    this.sku = sku;
    this.qty = qty;
    this.advisorId = advisorId;
  }
}

