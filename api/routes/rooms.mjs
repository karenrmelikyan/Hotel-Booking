import express from "express";
import {verifyAdmin} from "../utils/verifyToken.mjs";
import {
    createRoom,
    updateRoom,
    deleteRoom,
    getRoom,
    getRooms,
    updateRoomAvailability,
} from "../controllers/room.mjs";
const router = express.Router();

// CREATE
router.post('/:hotelid', verifyAdmin, createRoom);

// UPDATE
router.put('/:id', verifyAdmin, updateRoom);
router.put('/availability/:id', updateRoomAvailability)

// DELETE
router.delete('/:id/:hotelid', verifyAdmin, deleteRoom);

// GET ONE
router.get('/:id', getRoom);

// GET ALL
router.get('/', getRooms);

export default router;