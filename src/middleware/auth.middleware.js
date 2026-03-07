import jwt from "jsonwebtoken";
import { prisma } from "../lib/db.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ messgae: "Unauthorized - No token provided." });
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        image: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
        return res.status(404).json({message: "user not found"})
    }

    req.user = user
    next()
  } catch (error) {
    console.error("Error in authenticate middleware ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
