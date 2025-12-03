import express from "express";
import adminRoutes from "./routes/adminRoutes";
import sellerRoutes from "./routes/sellerRoutes";
import { AppDataSource } from "./config/data-source";

const app = express();

app.use(express.json());
app.use("/api/admin", adminRoutes);
app.use("/api/seller",sellerRoutes)
const PORT = process.env.PORT || 3001;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log("Server running on port ",PORT);
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });
