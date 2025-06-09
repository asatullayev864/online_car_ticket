const { sendErrorRes } = require("../helpers/send_error_res");
const District = require("../model/district.model");
const Region = require("../model/regions.model");

const addDistrict = async (req, res) => {
    try {
        const { name, region_id } = req.body;

        if (!name || !region_id) {
            return sendErrorRes({ message: "Iltimos, barcha ma'lumotlarni kiriting..!" }, res, 400);
        }

        const region = await Region.findByPk(region_id);
        if (!region) {
            return sendErrorRes({ message: "Bunday region mavjud emas..!" }, res, 404);
        }

        const district = await District.create({ name, region_id });

        res.status(201).json({
            message: "✅ Yangi district muvaffaqiyatli qo'shildi",
            data: district
        });
    } catch (error) {
        sendErrorRes(error, res, 400);
    }
};

const getAllDistricts = async (req, res) => {
    try {
        const districts = await District.findAll({
            include: {
                model: Region,
                attributes: ['id', 'name']
            }
        });

        if (!districts || districts.length === 0) {
            return sendErrorRes({ message: "Districtlar topilmadi..!" }, res, 404);
        }

        res.status(200).json({
            message: "✅ Barcha districtlar:",
            data: districts
        });
    } catch (error) {
        sendErrorRes(error, res, 400);
    }
};

const getDistrictById = async (req, res) => {
    try {
        const { id } = req.params;

        const district = await District.findByPk(id, {
            include: {
                model: Region,
                attributes: ['id', 'name']
            }
        });

        if (!district) {
            return sendErrorRes({ message: "District topilmadi..!" }, res, 404);
        }

        res.status(200).json({
            message: `✅ ${id} - ID li district:`,
            data: district
        });
    } catch (error) {
        sendErrorRes(error, res, 500);
    }
};

const updateDistrictById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, region_id } = req.body;

        if (!name || !region_id) {
            return sendErrorRes({ message: "Barcha maydonlarni to'ldiring..!" }, res, 400);
        }

        const district = await District.findByPk(id);
        if (!district) {
            return sendErrorRes({ message: "District topilmadi..!" }, res, 404);
        }

        const region = await Region.findByPk(region_id);
        if (!region) {
            return sendErrorRes({ message: "Region topilmadi..!" }, res, 404);
        }

        await district.update({ name, region_id });

        res.status(200).json({
            message: "✅ District muvaffaqiyatli yangilandi",
            data: district
        });
    } catch (error) {
        sendErrorRes(error, res, 500);
    }
};

const deleteDistrictById = async (req, res) => {
    try {
        const { id } = req.params;

        const district = await District.findByPk(id);
        if (!district) {
            return sendErrorRes({ message: "District topilmadi..!" }, res, 404);
        }

        await district.destroy();

        res.status(200).json({ message: "✅ District muvaffaqiyatli o'chirildi" });
    } catch (error) {
        sendErrorRes(error, res, 500);
    }
};

module.exports = {
    addDistrict,
    getAllDistricts,
    getDistrictById,
    updateDistrictById,
    deleteDistrictById
};