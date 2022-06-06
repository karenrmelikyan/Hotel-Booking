import express from "express";
import {verifyToken, verifyUser, verifyAdmin} from "../utils/verifyToken.mjs";
import {
    updateUser,
    deleteUser,
    getUser,
    getUsers
} from "../controllers/user.mjs";

const router = express.Router();

// router.get('/checkauth', verifyToken, (req, res, next) => {
//     res.send("Hello user, you are logged in")
// });
//
// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//     res.send("Hello user, you are logged in and can delete your account")
// });
//
// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//     res.send("Hello user, you are logged in and can delete all accounts")
// });


// UPDATE
router.put('/:id', verifyUser, updateUser);

// DELETE
router.delete('/:id', verifyUser, deleteUser);

// GET
router.get('/:id', verifyUser, getUser);

// GET ALL
router.get('/', verifyAdmin, getUsers);

export default router;