const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  // Authorization sarlavhasidan tokenni olish
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Token taqdim etilmagan" });
  }

  // Token "Bearer " bilan boshlanishini tekshirish
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token formati noto‘g‘ri" });
  }

  // Tokenni ajratib olish
  const token = authHeader.replace("Bearer ", "");

  try {
    // Tokenni tekshirish
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Dekodlangan foydalanuvchi ma'lumotlarini (_id, email, username) so‘rovga qo‘shish
    next(); // Keyingi middleware yoki marshrut ishlovchisiga o‘tish
  } catch (e) {
    return res.status(401).json({ message: "Token noto‘g‘ri yoki muddati o‘tgan" });
  }
};

module.exports = authMiddleware;