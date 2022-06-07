import Hotel from "../models/Hotel.mjs";

export async function createHotel(req, res, next) {
    const newHotel = new Hotel(req.body);
    try{
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (err) {
        next(err);
    }
}

export async function updateHotel(req, res, next) {
    try{
        const updatedHotel = await Hotel.findOneAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true},
        );
        res.status(201 ).json(updatedHotel);
    } catch (err) {
        next(err);
    }
}

export async function deleteHotel(req, res, next) {
    try{
        await Hotel.findByIdAndDelete(
            req.params.id,
            {$set: req.body},
        );
        res.status(200 ).json('Hotel has been deleted');
    } catch (err) {
        next(err);
    }
}

export async function getHotel(req, res, next) {
    try{
        const hotel = await Hotel.findById(req.params.id);
        res.status(200 ).json(hotel);
    } catch (err) {
        next(err);
    }
}

export async function getHotels(req, res, next) {
    try{
        const hotels = await Hotel.find();
        res.status(200 ).json(hotels);
    } catch (err) {
        next(err);
    }
}