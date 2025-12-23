import express from "express";
import path from "path";
import users from "./routes/users.js"
import dotenv from 'dotenv'

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 3000;
const TODOS_PATH = process.env.TODOS_PATH || path.join(__dirname, "data", "users.json");

dotenv.config({path:".env"})
console.log(process.env.PORT);
console.log(process.env);



app.use(express.json());


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ================== ROUTES ===================

app.get("/", async (req, res) => {
  res.json({
    message: "Welcome to Todo List API",
    version: "1.0.0",
  });
});

app.use("/users", users);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
