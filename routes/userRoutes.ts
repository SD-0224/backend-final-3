import express from "express";
import {
  getAllUsers,
  getUserById,
  createNewUser,
  loginUser,
  logoutUser,
  updateUserById,
  deleteUserById,
} from "../controllers/userController";
import { isAuthorized } from "../middleware/auth";

const router = express.Router();
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     responses:
 *       '200':
 *         description: A successful response with a list of users.
 *       '500':
 *         description: Internal server error.
 *   post:
 *     summary: Create a new user
 *     description: Create a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The first name of the user.
 *               lastName:
 *                 type: string
 *                 description: The last name of the user.
 *               user:
 *                 type: string
 *                 description: The username of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               phone:
 *                 type: string
 *                 description: The phone number of the user.
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: The date of birth of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password of the user.
 *             required:
 *               - firstName
 *               - lastName
 *               - user
 *               - email
 *               - phone
 *               - dateOfBirth
 *               - password
 *     responses:
 *       '201':
 *         description: User created successfully.
 *       '400':
 *         description: Bad request. Invalid data format.
 *       '409':
 *         description: Conflict. Email or username is already associated with an account.
 *       '500':
 *         description: Internal server error.
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response with the user details.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 * /api/users/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate user credentials and generate JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password of the user.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Login successful. JWT token generated.
 *       '401':
 *         description: Unauthorized. Invalid credentials.
 *       '404':
 *         description: Not found. Email not found.
 *       '500':
 *         description: Internal server error.
 * /api/users/auth/logout:
 *   get:
 *     summary: User logout
 *     description: Invalidate JWT token and log out the user.
 *     responses:
 *       '200':
 *         description: Logout successful.
 *       '500':
 *         description: Internal server error.
 */

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.post("/auth/signup", createNewUser);

router.post("/auth/login", loginUser);

router.get("/auth/logout", logoutUser);

router.put("/:userid", [isAuthorized], updateUserById);
router.delete("/:userid", [isAuthorized], deleteUserById);

export default router;
