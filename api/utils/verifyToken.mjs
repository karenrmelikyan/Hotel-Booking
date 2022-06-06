import jwt from "jsonwebtoken";
import createError from "./error.mjs";

export function verifyToken(req, res, next) {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userData) => {
        if (err) {
            return next(createError(403, "Token is not valid!"));
        }

        req.user = userData;
        next();
    });
}

export function verifyUser(req, res, next) {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    })
}

export function verifyAdmin(req, res, next) {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    })
}