const { sendErrorRes } = require("../helpers/send_error_res");
const Buses = require("../model/buses.model");

const addBuses = async (req, res) => {
    try {
        const { number_plate, seat_count, model } = req.body;

        if (!number_plate || !seat_count || !model) {
            return sendErrorRes({ message: "Iltimos, barcha ma'lumotlarni to'liq kiriting..!" }, res, 400);
        }

        const existing = await Buses.findOne({ where: { number_plate } });
        if (existing) {
            return sendErrorRes({ message: "Bunday avtobus raqami allaqachon mavjud..!" }, res, 400);
        }

        const newBus = await Buses.create({ number_plate, seat_count, model });

        res.status(201).json({
            message: "✅ Bus muvaffaqiyatli qo'shildi",
            data: newBus
        });
    } catch (error) {
        sendErrorRes(error, res, 400);
    }
};

const getAllBuses = async (req, res) => {
    try {
        const buses = await Buses.findAll();
        if (!buses || buses.length === 0) {
            return sendErrorRes({ message: "Buslar topilmadi..!" }, res, 404);
        }

        res.status(200).json({
            message: "✅ Barcha buslar ro'yxati:",
            data: buses
        });
    } catch (error) {
        sendErrorRes(error, res, 400);
    }
};

const getBusesById = async (req, res) => {
    try {
        const { id } = req.params;
        const bus = await Buses.findByPk(id);

        if (!bus) {
            return sendErrorRes({ message: "Bunday ID li bus topilmadi!" }, res, 404);
        }

        res.status(200).json({
            message: `✅ ${id}-ID li bus:`,
            data: bus
        });
    } catch (error) {
        sendErrorRes(error, res, 500);
    }
};

const updateBusesById = async (req, res) => {
    try {
        const { id } = req.params;
        const { number_plate, seat_count, model } = req.body;

        if (!number_plate || !seat_count || !model) {
            return sendErrorRes({ message: "Iltimos, barcha ma'lumotlarni kiriting!" }, res, 400);
        }

        const bus = await Buses.findByPk(id);
        if (!bus) {
            return sendErrorRes({ message: "Bus topilmadi!" }, res, 404);
        }

        const duplicate = await Buses.findOne({ where: { number_plate } });
        if (duplicate && duplicate.id != id) {
            return sendErrorRes({ message: "Bu raqam boshqa busga tegishli!" }, res, 400);
        }

        await bus.update({ number_plate, seat_count, model });

        res.status(200).json({
            message: "✅ Bus muvaffaqiyatli yangilandi",
            data: bus
        });
    } catch (error) {
        sendErrorRes(error, res, 500);
    }
};

const deleteBusesById = async (req, res) => {
    try {
        const { id } = req.params;

        const bus = await Buses.findByPk(id);
        if (!bus) {
            return sendErrorRes({ message: "Bus topilmadi!" }, res, 404);
        }

        await bus.destroy();

        res.status(200).json({ message: "✅ Bus muvaffaqiyatli o'chirildi" });
    } catch (error) {
        sendErrorRes(error, res, 500);
    }
};

module.exports = {
    addBuses,
    getAllBuses,
    getBusesById,
    updateBusesById,
    deleteBusesById
};