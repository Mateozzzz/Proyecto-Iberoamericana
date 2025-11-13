import express from "express";
import cors from "cors";
import reservationRoutes from "./modules/reservations/infra/reservationRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/reservations", reservationRoutes);

// Middleware básico de errores
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});

