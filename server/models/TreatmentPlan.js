const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TreatmentPlanSchema = new Schema({
    name: { type: String, required: true },  // Name of the treatment plan (e.g., "Orthodontic Treatment Plan")
    type: { type: String, enum: ['default', 'custom'], default: 'custom' },  // Defines if the plan is a default template or a custom plan
    steps: [
        {
            stepName: { type: String, required: true },  // Name of the step
            type: { type: String, enum: ['procedure', 'medication', 'other'], default: 'procedure' },  // Type of the step
            description: { type: String },  // Description of the step
            duration: { type: Number, required: true },  // Duration of the step in minutes
        }
    ],  // Steps in the treatment plan
    totalSteps: { type: Number, required: true, default: function () { return this.steps.length; } },  // Total number of steps in the plan
    description: { type: String },  // Description of the treatment plan
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // User who created the treatment plan
}, {
    timestamps: true,
});

const TreatmentPlan = mongoose.model('TreatmentPlan', TreatmentPlanSchema);
module.exports = TreatmentPlan;
