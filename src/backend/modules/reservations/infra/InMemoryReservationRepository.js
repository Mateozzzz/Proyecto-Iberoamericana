import { ReservationRepository } from "../domain/ReservationRepository.js";
import { Reservation } from "../domain/Reservation.js";

let idCounter = 1;

export class InMemoryReservationRepository extends ReservationRepository {
  constructor() {
    super();
    this.data = new Map();
  }

  async create({ sku, qty, advisorId }) {
    const res = new Reservation({
      id: idCounter++,
      sku,
      qty,
      advisorId
    });
    this.data.set(res.id, res);
    return res;
  }

  async findById(id) {
    return this.data.get(id) || null;
  }
}

