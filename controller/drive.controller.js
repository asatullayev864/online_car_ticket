const Driver = require("../model/driver.model");
const { sendErrorRes } = require("../helpers/send_error_res");

const addDriver = async (req, res) => {
    try {
        const { name, phone_number } = req.body;

        if (!name || !phone_number) {
            return sendErrorRes({ message: "Iltimos, ism va telefon raqamni kiriting!" }, res, 400);
        }

        const newDriver = await Driver.create({ name, phone_number });

        res.status(201).json({
            message: "✅ Haydovchi muvaffaqiyatli qo'shildi",
            data: newDriver
        });
    } catch (error) {
        sendErrorRes(error, res, 400);
    }
};

const getAllDrivers = async (req, res) => {
    try {
        const drivers = await Driver.findAll();

        res.status(200).json({
            message: "✅ Barcha haydovchilar:",
            data: drivers
        });
    } catch (error) {
        sendErrorRes(error, res, 400);
    }
};

const getDriverById = async (req, res) => {
    try {
        const { id } = req.params;
        const driver = await Driver.findByPk(id);

        if (!driver) {
            return sendErrorRes({ message: "Bunday haydovchi topilmadi!" }, res, 404);
        }

        res.status(200).json({
            message: "✅ Haydovchi topildi:",
            data: driver
        });
    } catch (error) {
        sendErrorRes(error, res, 400);
    }
};

const updateDriverById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone_number } = req.body;

        const driver = await Driver.findByPk(id);
        if (!driver) {
            return sendErrorRes({ message: "Haydovchi topilmadi!" }, res, 404);
        }

        await driver.update({ name, phone_number });

        res.status(200).json({
            message: "✅ Haydovchi yangilandi",
            data: driver
        });
    } catch (error) {
        sendErrorRes(error, res, 400);
    }
};

const deleteDriverById = async (req, res) => {
    try {
        const { id } = req.params;
        const driver = await Driver.findByPk(id);

        if (!driver) {
            return sendErrorRes({ message: "Haydovchi topilmadi!" }, res, 404);
        }

        await driver.destroy();

        res.status(200).json({
            message: "✅ Haydovchi o'chirildi"
        });
    } catch (error) {
        sendErrorRes(error, res, 400);
    }
};

module.exports = {
    addDriver,
    getAllDrivers,
    getDriverById,
    updateDriverById,
    deleteDriverById
};