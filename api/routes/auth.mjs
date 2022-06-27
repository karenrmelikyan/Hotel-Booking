import express from "express";
import {register, login, logout} from "../controllers/auth.mjs";

const router = express.Router();

// REGISTER
router.post('/register', register);

// LOGIN
router.post('/login', login);

// LOGOUT
router.get('/logout', logout);

export default router;