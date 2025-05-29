const express = require("express");
const { register, login, getUsers } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Foydalanuvchi autentifikatsiyasi
 */

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
 *         description: Foydalanuvchi ro'yxatdan o'tdi
 *       400:
 *         description: Ma'lumotlar yetarli emas yoki foydalanuvchi mavjud
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Foydalanuvchi tizimga kirish
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
 *         description: Muvaffaqiyatli kirish
 *       400:
 *         description: Email va parol kiritilishi shart
 *       401:
 *         description: Noto‘g‘ri email yoki parol
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/getUsers:
 *   get:
 *     summary: Barcha foydalanuvchilarni olish
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Foydalanuvchilar ro'yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *       401:
 *         description: Token taqdim etilmagan yoki noto‘g‘ri
 *       500:
 *         description: Server xatosi
 */
router.get("/getUsers", authMiddleware, getUsers);

module.exports = router;