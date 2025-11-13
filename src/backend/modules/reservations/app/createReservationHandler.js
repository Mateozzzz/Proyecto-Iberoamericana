import { CreateReservationCommand } from "./CreateReservationCommand.js";
import { eventBus } from "../../../shared/EventBus.js";

export function createReservationHandler({ reservationRepository }) {
  return async function handle(command) {
    if (!(command instanceof CreateReservationCommand)) {
      throw new Error("Invalid command");
    }

    if (!command.sku || !command.qty || !command.advisorId) {
      throw new Error("Missing data");
    }

    const reservation = await reservationRepository.create({
      sku: command.sku,
      qty: command.qty,
      advisorId: command.advisorId
    });

    await eventBus.publish({
      type: "ReservationCreated",
      payload: {
        reservationId: reservation.id,
        sku: reservation.sku,
        qty: reservation.qty,
        advisorId: reservation.advisorId
      }
    });

    return reservation;
  };
}

