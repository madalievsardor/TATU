const express = require("express");
const { register, login, getUsers } = require("../controllers/authController");

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Yangi foydalanuvchini ro'yxatdan o'tkazish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - username
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               gender:
 *                 type: string
 *               profileImage:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi
 *       400:
 *         description: Ma'lumotlar yetarli emas
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login qilish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli login
 *       401:
 *         description: Login yoki parol noto'g'ri
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/getUsers:
 *   get:
 *     summary: Barcha foydalanuvchilarni olish
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Foydalanuvchilar ro'yxati
 */
router.get("/getUsers", getUsers);

module.exports = router;
