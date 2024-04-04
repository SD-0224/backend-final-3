import dotenv from "dotenv";
import express, { Request, Response, Application } from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./models";
import User from "./models";

// initialize configuration
dotenv.config();

const app: Application = express();

// Use morgan middleware with the "combined" format
app.use(morgan("dev"));

// Use cookie-parser middleware
app.use(cookieParser());

app.use(cors());

// Data coming from HTML forms
app.use(express.urlencoded({ extended: true }));

// Data coming as JSON - POSTMAN for instace
app.use(express.json());

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT;

const start = async (): Promise<void> => {
  try {
    await db.sequelize.sync({ alter: true });
    // tslint:disable-next-line:no-console
    console.log(`Databases synced Successfully`);
    app.listen(port, () => {
      // tslint:disable-next-line:no-console
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error);
    // Exits the process with an error status code
    process.exit(1);
  }
};
// Invokes the function to start the server
void start();

app.get("/", (req: Request, res: Response, err: any) => {
  res.send("Hello World, this is our final project group#3");
});

// use routes in the routes folder

// If route does not exist, redirect to the root
app.use((req: Request, res: Response, err: any) => {
  res.redirect("/");
});

export default app;
