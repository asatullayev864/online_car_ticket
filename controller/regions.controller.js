const { sendErrorRes } = require("../helpers/send_error_res");
const Region = require("../model/regions.model");

const addRegion = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return sendErrorRes({ message: "Iltimos, region nomini kiriting!" }, res, 400);
        }

        const region = await Region.create({ name });

        res.status(201).json({
            message: "✅ Yangi region muvaffaqiyatli qo'shildi",
            data: region
        });
    } catch (error) {
        sendErrorRes(error, res, 400);
    }
};

const getAllRegions = async (req, res) => {
    try {
        const regions = await Region.findAll();
        if (!regions || regions.length === 0) {
            return sendErrorRes({ message: "Regionlar topilmadi!" }, res, 404);
        }

        res.status(200).json({
            message: "✅ Barcha regionlar:",
            data: regions
        });
    } catch (error) {
        sendErrorRes(error, res, 400);
    }
};

const getRegionById = async (req, res) => {
    try {
        const { id } = req.params;
        const region = await Region.findByPk(id);

        if (!region) {
            return sendErrorRes({ message: "Bunday ID li region topilmadi!" }, res, 404);
        }

        res.status(200).json({
            message: `✅ ${id} - ID li region:`,
            data: region
        });
    } catch (error) {
        sendErrorRes(error, res, 500);
    }
};

const updateRegionById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return sendErrorRes({ message: "Region nomini kiriting!" }, res, 400);
        }

        const region = await Region.findByPk(id);
        if (!region) {
            return sendErrorRes({ message: "Region topilmadi!" }, res, 404);
        }

        await region.update({ name });

        res.status(200).json({
            message: "✅ Region muvaffaqiyatli yangilandi",
            data: region
        });
    } catch (error) {
        sendErrorRes(error, res, 500);
    }
};

const deleteRegionById = async (req, res) => {
    try {
        const { id } = req.params;

        const region = await Region.findByPk(id);
        if (!region) {
            return sendErrorRes({ message: "Region topilmadi!" }, res, 404);
        }

        await region.destroy();

        res.status(200).json({ message: "✅ Region muvaffaqiyatli o'chirildi" });
    } catch (error) {
        sendErrorRes(error, res, 500);
    }
};

module.exports = {
    addRegion,
    getAllRegions,
    getRegionById,
    updateRegionById,
    deleteRegionById
};