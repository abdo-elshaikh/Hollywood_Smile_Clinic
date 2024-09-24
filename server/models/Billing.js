const mongoose = require('mongoose');

// Define schema for Installment Plan
const InstallmentSchema = new mongoose.Schema({
    totalInstallments: { type: Number, required: true }, // Total number of installments
    installmentsPaid: { type: Number, default: 0 }, // Installments paid so far
    nextDueDate: { type: Date, required: true }, // Next payment due date
    installmentAmount: { type: Number, required: true }, // Amount per installment
    isCompleted: { type: Boolean, default: false }, // Whether the installment plan is fully paid
}, { _id: false });

// Define schema for Payment History
const PaymentHistorySchema = new mongoose.Schema({
    amountPaid: { type: Number, required: true }, // Amount paid in this transaction
    paymentDate: { type: Date, default: Date.now }, // Date of the payment
    method: { type: String, enum: ['cash', 'credit_card', 'insurance', 'installment', 'Wallet Payment'], required: true }, // Payment method
    note: { type: String, required: false }, // Optional note (e.g., for installment payments)
}, { _id: false });

// Updated Billing Schema
const BillingSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true }, // Link to Patient model
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true }], // List of linked appointments
    totalAmount: { type: Number, required: true }, // Total service amount
    discount: {
        amount: { type: Number, default: 0 }, // Discount amount
        reason: { type: String, required: false }, // Discount reason
    },
    finalAmountDue: { type: Number, required: true }, // Total amount due after discounts
    paidAmount: { type: Number, default: 0 }, // Total paid amount so far
    remainingBalance: { type: Number, required: true }, // Remaining balance after payments
    paymentStatus: { type: String, enum: ['pending', 'partially_paid', 'paid', 'installment'], default: 'pending' }, // Payment status
    paymentHistory: [PaymentHistorySchema], // History of payments
    installmentPlan: { type: InstallmentSchema, required: false }, // Installment plan details (if applicable)
    insurance: {
        claimed: { type: Boolean, default: false }, // Whether insurance was claimed
        provider: { type: String, required: false }, // Insurance provider name
        claimNumber: { type: String, required: false }, // Insurance claim reference
    },
    invoiceDate: { type: Date, default: Date.now }, // Date of invoice generation
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who created the invoice
    lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who last updated the billing
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Method to update remaining balance after a payment
BillingSchema.methods.updateRemainingBalance = function () {
    this.remainingBalance = this.finalAmountDue - this.paidAmount;
    this.paymentStatus = this.remainingBalance === 0 ? 'paid' : 'partially_paid';
};

// Method to apply a discount and recalculate the final amount due
BillingSchema.methods.applyDiscount = function (discountAmount, reason) {
    this.discount.amount = discountAmount;
    this.discount.reason = reason;
    this.finalAmountDue = this.totalAmount - discountAmount;
    this.updateRemainingBalance();
};

// Method to add a payment to the billing
BillingSchema.methods.addPayment = function (amountPaid, method, note = '') {
    this.paidAmount += amountPaid;
    this.paymentHistory.push({ amountPaid, method, note });
    this.updateRemainingBalance();
};

// Export Billing model
const Billing = mongoose.model('Billing', BillingSchema);
module.exports = Billing;
