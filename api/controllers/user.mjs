import User from "../models/User.mjs";

export async function updateUser(req, res, next) {
    try {
        const updatedUser = await User.findOneAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true},
        );
        res.status(201).json(updatedUser);
    } catch (err) {
        next(err);
    }
}

export async function deleteUser(req, res, next) {
    try{
        await User.findByIdAndDelete(
            req.params.id,
            {$set: req.body},
        );
        res.status(200 ).json('User has been deleted');
    } catch (err) {
        next(err);
    }
}

export async function getUser(req, res, next) {
    try{
        const user = await User.findById(req.params.id);
        res.status(200 ).json(user);
    } catch (err) {
        next(err);
    }
}

export async function getUsers(req, res, next) {
    try{
        const users = await User.find();
        res.status(200 ).json(users);
    } catch (err) {
        next(err);
    }
}