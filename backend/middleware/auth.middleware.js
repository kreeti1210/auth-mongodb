import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  try {
    console.log(req.cookies);
    let token = req.cookies?.token;
    console.log("Token found:", token ? "YES" : "NO");
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Authentication failed",
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      console.log(decoded);

      req.user = decoded;
    
    } catch (error) {
      console.log("Auth middleware failed");
      return res.status(500).json({
        success: false,
        message: "Internal Failure",
      });
    }
  } catch (error) {}
  next();
};
