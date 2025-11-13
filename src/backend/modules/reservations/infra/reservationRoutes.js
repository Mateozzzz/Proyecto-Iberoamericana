import { Router } from "express";
import { InMemoryReservationRepository } from "./InMemoryReservationRepository.js";
import { createReservationHandler } from "../app/createReservationHandler.js";
import { CreateReservationCommand } from "../app/CreateReservationCommand.js";

const router = Router();

const reservationRepository = new InMemoryReservationRepository();
const handleCreateReservation = createReservationHandler({ reservationRepository });

router.post("/", async (req, res, next) => {
  try {
    const cmd = new CreateReservationCommand(req.body);
    const reservation = await handleCreateReservation(cmd);
    res.status(201).json(reservation);
  } catch (err) {
    next(err);
  }
});

export default router;

