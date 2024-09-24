const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AppointmentSchema = new Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },  // Link to the Patient model
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },  // Link to the Department model
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },  // Link to the Service model
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Link to the User model where user is a doctor
    visitDate: { type: Date, required: true },  // Date of the visit
    visitTime: { type: String, required: true },  // Time of the visit
    status: { type: String, enum: ['pending', 'inProgress', 'completed', 'cancelled', 'rescheduled'], default: 'pending' },  // Status of the appointment
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Link to the User model
    cancelledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },  // Link to the User model
    cancelledReason: { type: String, required: function () { return this.status === 'cancelled' } },
    isFirstVisit: { type: Boolean, default: true },
    visitType: {
        type: String,
        enum: [
            'Normal Visit',          // Normal visit كشف عادى
            'Routine Checkup',       // General dental checkup  متابعة دورية - إعادة
            'Emergency',             // Urgent care visit متابعة طارئة
            'Follow-up',             // Follow-up after treatment متابعة بعد العمل
            'Consultation',          // Initial consultation for treatment متابعة بدء العمل - استشارة 
            'Teeth Whitening',       // Cosmetic teeth whitening procedure تبييض الأسنان
            'Orthodontics',          // Braces or other orthodontic treatments تقويم الأسنان
            'Cosmetic Dentistry',    // Aesthetic treatments like veneers, smile design and fillings حشوات الأسنان التجميلية
            'Dental Surgery',        // Extractions, implants, or other surgeries جراحة اسنان
            'Restorative',           // Restorative dentistry حشوات الأسنان
            'Tempromandibular',      // Tempromandibular surgery جراحة تيمورمانديبول - مفصل الفك
            'Pediatric',             // Pediatric dentistry حشوات الأطفال
            'prosthodontics',        // Prosthodontics or dentures تركيبات الأسنان
        ],
        default: 'Routine Checkup',
        bookType: { type: String, enum: ['Online', 'Offline'], default: 'offline', required: true },
    },
    doctorNotes: { type: String },  // Additional notes about the visit
}, {
    timestamps: true,
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;
