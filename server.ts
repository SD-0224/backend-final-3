import dotenv from "dotenv";
import express, { Request, Response, Application } from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./models";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import orderRoutes from "./routes/orderRoutes";
import brandRoutes from "./routes/brandRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import { cronJob } from "./utils/cronJob";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { isCurrentUser } from "./middleware/auth";

// initialize configuration
dotenv.config();

const app: Application = express();

// Use morgan middleware with the "combined" format
app.use(morgan("dev"));

// Use cookie-parser middleware
app.use(cookieParser());

// Enable using APIs from everywhere
app.use(cors());

// Data coming from HTML forms
app.use(express.urlencoded({ extended: true }));

// Data coming as JSON - POSTMAN for instace
app.use(express.json());

// port is now available to the Node.js runtime
// as if it were an environment variable
const port: any = process.env.SERVER_PORT;

// Start the cron job every 14 minutes to keep our live website active on render
cronJob.start();

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "https://backend-final-3.onrender.com",
      },
    ],
  },
  apis: ["./routes/*.ts", "./models/*.ts"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);
const start = async (): Promise<void> => {
  try {
    await db.sequelize.sync();

    app.listen(port, "0.0.0.0", () => {
      // tslint:disable-next-line:no-console
      console.log(`Server running at port:${port}`);
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

app.get("*", isCurrentUser);

app.get("/", (req: Request, res: Response, err: any) => {
  res.send("E-Commerce Website Backend Service for Group#3 TAP-SD-0224");
});

// use routes in the routes folder
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);

// If route does not exist, redirect to the root
app.use((req: Request, res: Response, err: any) => {
  res.status(404).send("Page Not Found");
});

export default app;
