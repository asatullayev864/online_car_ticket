const busDriver = require("../model/busDriver.model");
const { sendErrorRes } = require("../helpers/send_error_res");

const addBusDriver = async (req, res) => {
    try {
        const { busId, driverId } = req.body;

        if (!busId || !driverId) {
            return sendErrorRes({ message: "Iltimos, busId va driverId ni kiriting!" }, res, 400);
        }

        const newBusDriver = await busDriver.create({ busId, driverId });

        res.status(201).json({
            message: "✅ Bus-driver muvaffaqiyatli qo'shildi",
            data: newBusDriver
        });
    } catch (error) {
        sendErrorRes(error, res, 400);
    }
};

const getAllBusDrivers = async (req, res) => {
    try {
        const busDrivers = await busDriver.findAll();

        res.status(200).json({
            message: "✅ Barcha bus-driverlar:",
            data: busDrivers
        });
    } catch (error) {
        sendErrorRes(error, res, 400);
    }
};

const getBusDriverById = async (req, res) => {
    try {
        const { id } = req.params;
        const busDrivers = await busDriver.findByPk(id);

        if (!busDrivers) {
            return sendErrorRes({ message: "bunday ID li bog'lanish topilmadi!" }, res, 404);
        }

        res.status(200).json({
            message: `✅ ${id} - ID li bus-driver:`,
            data: busDrivers
        });
    } catch (error) {
        sendErrorRes(error, res, 500);
    }
};

const updateBusDriverById = async (req, res) => {
    try {
        const { id } = req.params;
        const { busId, driverId } = req.body;

        const busDrivers = await busDriver.findByPk(id);
        if (!busDrivers) {
            return sendErrorRes({ message: "Bus-driver topilmadi..!" }, res, 404);
        }

        await busDriver.update({ busId, driverId });

        res.status(200).json({
            message: "✅ Bus-driver muvaffaqiyatli yangilandi",
            data: busDrivers
        });
    } catch (error) {
        sendErrorRes(error, res, 500);
    }
};

const deleteBusDriverById = async (req, res) => {
    try {
        const { id } = req.params;

        const busDrivers = await busDriver.findByPk(id);
        if (!busDrivers) {
            return sendErrorRes({ message: "bus-driver topilmadi..!" }, res, 404);
        }

        await busDrivers.destroy();

        res.status(200).json({ message: "✅ Bus-driver muvaffaqiyatli o'chirildi" });
    } catch (error) {
        sendErrorRes(error, res, 500);
    }
};

module.exports = {
    addBusDriver,
    getAllBusDrivers,
    getBusDriverById,
    updateBusDriverById,
    deleteBusDriverById
};