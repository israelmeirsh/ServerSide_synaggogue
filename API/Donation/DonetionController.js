exports.createDonation = async (req, res) => {
    try {
        const { userId, amount, donationDate, cardDetails } = req.body;
        const newDonation = new Donation({ userId, amount, donationDate, cardDetails });
        const savedDonation = await newDonation.save();
        res.status(201).json({ message: "תרומה נוצרה בהצלחה!", data: savedDonation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


