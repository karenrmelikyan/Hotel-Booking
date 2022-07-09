import User from "../models/User.mjs";
import bcrypt from "bcryptjs";
import createError from "../utils/error.mjs";
import jwt from "jsonwebtoken";

export async function register(req, res, next) {
   try {
           const salt = bcrypt.genSaltSync(10);
           const hash = bcrypt.hashSync(req.body.password, salt);

           const newUser = new User({
           ...req.body,
           password: hash,
       })

       await newUser.save()
       res.status(200).send('New user has been created')

   } catch (err) {
       next(err)
   }
}

export async function login(req, res, next) {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) return next(createError(404, 'User not found'))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect)  return next(createError(400, 'Wrong password or username'))

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET_KEY)

        // hide password and isAdmin from response
        const {password, isAdmin, ...otherDetails} = user._doc;

        // set cookies
        res.cookie('access_token', token, {httpOnly: true})
            .status(200)
            .json({details: {...otherDetails}, isAdmin})

    } catch (err) {
        next(err)
    }
}

export async function logout(req, res) {
    res.clearCookie('access_token').status(200).json();
}
