import express from "express";
import fileRoutes from "./routes/fileRoutes";

const app = express();
const port = 3000;

app.use(fileRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
