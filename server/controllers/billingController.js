const Billing = require('../models/Billing');

const createBilling = async (req, res) => {
    const { patientId, appointmentIds, totalAmount, discountAmount, discountReason, paymentMethod, isInstallment, totalInstallments, installmentAmount } = req.body;

    try {
        // Calculate final amount due after applying discount
        const finalAmountDue = totalAmount - discountAmount;

        const billing = await Billing.create({
            patient: patientId,
            appointments: appointmentIds, // Multiple appointments
            totalAmount,
            discount: { amount: discountAmount, reason: discountReason },
            finalAmountDue,
            remainingBalance: finalAmountDue,
            paymentMethod,
            installmentPlan: isInstallment ? {
                totalInstallments,
                installmentsPaid: 0,
                nextDueDate: new Date(), // Set the first installment due date to now (this can be customized)
                installmentAmount,
            } : null
        });

        res.status(201).json({ message: 'Billing record created successfully', billing });
    } catch (error) {
        console.error('Error creating billing record:', error);
        res.status(500).json({ error: 'Failed to create billing record' });
    }
};

const addPayment = async (req, res) => {
    const { billingId, amountPaid, paymentMethod, note } = req.body;

    try {
        const billing = await Billing.findById(billingId);

        if (!billing) {
            return res.status(404).json({ error: 'Billing record not found' });
        }

        billing.addPayment(amountPaid, paymentMethod, note);
        await billing.save();

        res.status(200).json({ message: 'Payment added successfully', billing });
    } catch (error) {
        console.error('Error adding payment:', error);
        res.status(500).json({ error: 'Failed to add payment' });
    }
};

const applyDiscount = async (req, res) => {
    const { billingId, discountAmount, discountReason } = req.body;

    try {
        const billing = await Billing.findById(billingId);

        if (!billing) {
            return res.status(404).json({ error: 'Billing record not found' });
        }

        billing.applyDiscount(discountAmount, discountReason);
        await billing.save();

        res.status(200).json({ message: 'Discount applied successfully', billing });
    } catch (error) {
        console.error('Error applying discount:', error);
        res.status(500).json({ error: 'Failed to apply discount' });
    }
};

const getBillingById = async (req, res) => {
    const billingId = req.params.id;
    try {
        const billing = await Billing.findById(billingId);
        if (!billing) {
            return res.status(404).json({ message: 'Billing not found' });
        }
        res.status(200).json({ billing });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getBillingByPatient = async (req, res) => {
    const patientId = req.params.id;
    try {
        const billing = await Billing.find({ patient: patientId });
        if (!billing) {
            return res.status(404).json({ message: 'Billing not found' });
        }
        res.status(200).json({ billing });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateBilling = async (req, res) => {
    const billingId = req.params.id;
    const { status } = req.body;
    try {
        const billing = await Billing.findById(billingId);
        if (!billing) {
            return res.status(404).json({ message: 'Billing not found' });
        }
        billing.status = status;
        await billing.save();
        res.status(200).json({ message: 'Billing updated successfully', billing });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteBilling = async (req, res) => {
    const billingId = req.params.id;
    try {
        const billing = await Billing.findByIdAndDelete(billingId);
        if (!billing) {
            return res.status(404).json({ message: 'Billing not found' });
        }
        res.status(200).json({ message: 'Billing deleted successfully', billing });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllBillings = async (req, res) => {
    try {
        const billings = await Billing.find();
        res.status(200).json({ billings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createBilling,
    addPayment,
    applyDiscount,
    getBillingById,
    getBillingByPatient,
    updateBilling,
    deleteBilling,
    getAllBillings
}
