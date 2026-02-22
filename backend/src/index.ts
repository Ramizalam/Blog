import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();
const PORT = process.env.PORT || 5000;

// Global middleware
app.use(cors());
app.use(express.json());

app.use("/api/v1", routes);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
