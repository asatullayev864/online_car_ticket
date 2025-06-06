const { sendErrorRes } = require("../helpers/send_error_res");
const User = require("../model/user.model");
const bcrypt = require("bcrypt");

const addUser = async (req, res) => {
    try {
        const { full_name, phone_number, password, is_active, email } = req.body;
        if (!full_name || !phone_number || !password || is_active === undefined || !email) {
            return sendErrorRes({ message: "Iltimos ma'lumotlarni toliq kiriting..!" }, res, 404);
        };

        const exist = await User.findOne({ where: { email } });
        if (exist) {
            return sendErrorRes({ message: "Bu email bilan foydalanuvchi mavjud..!" }, res, 409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ full_name, phone_number, password: hashedPassword, is_active, email });

        res.status(201).json({
            message: "✅ Yangi user muvaffaqiyatli qoshildi",
            data: user
        });
    } catch (error) {
        sendErrorRes(error, res, 400);
    }
};

const getAllUser = async (req, res) => {
    try {
        const users = await User.findAll();
        if (!users) {
            return sendErrorRes({ message: "Bu tableda malumotlar topilmadi..!" }, res, 404);
        }
        res.status(200).send({
            message: "✅ Barcha Userlar:",
            data: users
        });
    } catch (error) {
        sendErrorRes(error, res, 400);
    }
};

const getUserbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).send({ message: "Bunday ID da ma'lumot topilmadi..!" });
        res.status(200).send({ message: `${id}-ID dagi user:`, data: user });
    } catch (error) {
        sendErrorRes(error, res, 500);
    }
};

const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { full_name, phone_number, password, is_active, email } = req.body;

        if (!full_name || !phone_number || !password || is_active === undefined || !email) {
            return sendErrorRes({ message: "Iltimos ma'lumotlarni to'liq kiriting..!" }, res, 400);
        }

        const user = await User.findByPk(id);
        if (!user) {
            return sendErrorRes({ message: "Bunday ID da user topilmadi..!" }, res, 404);
        }

        await user.update({ full_name, phone_number, password, is_active, email });

        res.status(200).json({ message: "User muvaffaqiyatli yangilandi", data: user });
    } catch (error) {
        sendErrorRes(error, res, 500);
    }
};

const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) {
            return sendErrorRes({ message: "Bunday ID bilan user topilmadi..!" }, res, 404);
        }

        await user.destroy();

        res.status(200).json({ message: "User muvaffaqiyatli o'chirildi" });
    } catch (error) {
        sendErrorRes(error, res, 500);
    }
};

module.exports = {
    addUser,
    getAllUser,
    getUserbyId,
    updateUserById,
    deleteUserById
}