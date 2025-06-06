const { sendErrorRes } = require("../helpers/send_error_res");
const UserRole = require("../model/userRole.model");

const addUserRole = async (req, res) => {
    try {
        const { UserId, RoleId } = req.body;

        if (!UserId || !RoleId) {
            return sendErrorRes({ message: "Iltimos, user_id va role_id ni kiriting!" }, res, 400);
        }

        const newUserRole = await UserRole.create({ UserId, RoleId });

        res.status(201).json({
            message: "✅ User-role muvaffaqiyatli qo'shildi",
            data: newUserRole
        });
    } catch (error) {
        sendErrorRes(error, res, 400);
    }
};

const getAllUserRoles = async (req, res) => {
    try {
        const userRoles = await UserRole.findAll();

        if (!userRoles || userRoles.length === 0) {
            return sendErrorRes({ message: "User-role ma'lumotlari topilmadi..!" }, res, 404);
        }

        res.status(200).json({
            message: "✅ Barcha user-role lar:",
            data: userRoles
        });
    } catch (error) {
        sendErrorRes(error, res, 400);
    }
};

const getUserRoleById = async (req, res) => {
    try {
        const { id } = req.params;

        const userRole = await UserRole.findByPk(id);

        if (!userRole) {
            return sendErrorRes({ message: "Bunday ID li user-role topilmadi..!" }, res, 404);
        }

        res.status(200).json({
            message: `✅ ${id} - ID li user-role:`,
            data: userRole
        });
    } catch (error) {
        sendErrorRes(error, res, 500);
    }
};

const updateUserRoleById = async (req, res) => {
    try {
        const { id } = req.params;
        const { UserId, RoleId } = req.body;

        if (!UserId || !RoleId) {
            return sendErrorRes({ message: "Iltimos, to'liq ma'lumot kiriting!" }, res, 400);
        }

        const userRole = await UserRole.findByPk(id);
        if (!userRole) {
            return sendErrorRes({ message: "User-role topilmadi!" }, res, 404);
        }

        const duplicate = await UserRole.findOne({
            where: { UserId, RoleId }
        });

        if (duplicate && duplicate.id != id) {
            return sendErrorRes({ message: "Bunday user-role allaqachon mavjud!" }, res, 400);
        }

        await userRole.update({ UserId, RoleId });

        res.status(200).json({
            message: "✅ User-role muvaffaqiyatli yangilandi",
            data: userRole
        });
    } catch (error) {
        sendErrorRes(error, res, 500);
    }
};

const deleteUserRoleById = async (req, res) => {
    try {
        const { id } = req.params;

        const userRole = await UserRole.findByPk(id);
        if (!userRole) {
            return sendErrorRes({ message: "User-role topilmadi!" }, res, 404);
        }

        await userRole.destroy();

        res.status(200).json({ message: "✅ User-role muvaffaqiyatli o'chirildi" });
    } catch (error) {
        sendErrorRes(error, res, 500);
    }
};

module.exports = {
    addUserRole,
    getAllUserRoles,
    getUserRoleById,
    updateUserRoleById,
    deleteUserRoleById
};