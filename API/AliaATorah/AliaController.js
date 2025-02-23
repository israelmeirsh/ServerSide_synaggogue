const Alia = require('./AliaSchema');

exports.addAlia = async (req, res) => {
    try {
        const { Parasha, alia, debt, userId, invoiceId } = req.body;
        const newAlia = new Alia({ Parasha, alia, debt, userId, invoiceId });
        const savedAlia = await newAlia.save();
        res.json({ message: "עליה נוספה בהצלחה!", savedAlia });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllAliot = async (req, res) => {
    try {
        const aliot = await Alia.find();
        res.json(aliot);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAliaById = async (req, res) => {
    try {
        const { id } = req.params;
        const alia = await Alia.findById(id);
        if (!alia) {
            return res.status(404).json({ message: "עליה לא נמצאה" });
        }
        res.json(alia);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateAliaById = async (req, res) => {
    try {
        const { id } = req.params;
        const { Parasha, alia, debt, invoiceId } = req.body;
        const updatedAlia = await Alia.findByIdAndUpdate(id, { Parasha, alia, debt, invoiceId }, { new: true });
        if (!updatedAlia) {
            return res.status(404).json({ message: "עליה לא נמצאה" });
        }
        res.json({ message: "עליה עודכנה בהצלחה!", updatedAlia });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteAliaById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAlia = await Alia.findByIdAndRemove(id);
        if (!deletedAlia) {
            return res.status(404).json({ message: "עליה לא נמצאה" });
        }
        res.json({ message: "עליה נמחקה בהצלחה!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

