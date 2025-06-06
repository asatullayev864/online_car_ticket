const { sendErrorRes } = require("../helpers/send_error_res");
const Role = require("../model/role.model");

const addRole = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return sendErrorRes({ message: "Iltimos, barcha ma'lumotlarni to'liq kiriting!" }, res, 400);
        }

        const role = await Role.create({ name, description });

        res.status(201).json({
            message: "✅ Yangi role muvaffaqiyatli qo'shildi",
            data: role
        });
    } catch (error) {
        sendErrorRes(error, res, 400);
    }
};

const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        if (!roles || roles.length === 0) {
            return sendErrorRes({ message: "Bu tableda malumotlar topilmadi..!" }, res, 404);
        }

        res.status(200).json({
            message: "✅ Barcha Rolelar:",
            data: roles
        });
    } catch (error) {
        sendErrorRes(error, res, 400);
    }
};

const getRoleById = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Role.findByPk(id);

        if (!role) {
            return sendErrorRes({ message: "Bunday ID da role topilmadi..!" }, res, 404);
        }

        res.status(200).json({
            message: `✅ ${id} - ID li role:`,
            data: role
        });
    } catch (error) {
        sendErrorRes(error, res, 500);
    }
};

const updateRoleById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        if (!name || !description) {
            return sendErrorRes({ message: "Iltimos, to'liq ma'lumot kiriting!" }, res, 400);
        }

        const role = await Role.findByPk(id);
        if (!role) {
            return sendErrorRes({ message: "Role topilmadi!" }, res, 404);
        }

        await role.update({ name, description });

        res.status(200).json({
            message: "✅ Role muvaffaqiyatli yangilandi",
            data: role
        });
    } catch (error) {
        sendErrorRes(error, res, 500);
    }
};

const deleteRoleById = async (req, res) => {
    try {
        const { id } = req.params;

        const role = await Role.findByPk(id);
        if (!role) {
            return sendErrorRes({ message: "Role topilmadi!" }, res, 404);
        }

        await role.destroy();

        res.status(200).json({ message: "✅ Role muvaffaqiyatli o'chirildi" });
    } catch (error) {
        sendErrorRes(error, res, 500);
    }
};

module.exports = {
    addRole,
    getAllRoles,
    getRoleById,
    updateRoleById,
    deleteRoleById
};