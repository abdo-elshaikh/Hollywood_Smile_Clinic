const mongoose = require('mongoose');

const OnlineBookingSchema = new mongoose.Schema({
    // patient information record
    name: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String, required: true },
    whatsapp: { type: String, required: false },
    email: { type: String, required: false },
    address: { type: String, required: true },
    // appointment information
    preferredDate: { type: Date, required: false },
    preferredTime: { type: String, required: false },
    preferredDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    notes: { type: String, required: false },
    isFirstVisit: { type: Boolean, default: true },
    visitType: {
        type: String,
        enum: [
            'Routine Checkup',       // General dental checkup متابعة دورية
            'Emergency',             // Urgent care visit متابعة طارئة
            'Follow-up',             // Follow-up after treatment متابعة بعد العمل
            'Consultation',          // Initial consultation for treatment متابعة بدء العمل - استشارة 
            'Teeth Whitening',       // Cosmetic teeth whitening procedure تبييض الأسنان
            'Orthodontics',          // Braces or other orthodontic treatments تقويم الأسنان
            'Cosmetic Dentistry',    // Aesthetic treatments like veneers, smile design and fillings حشوات الأسنان التجميلية
            'Dental Surgery',         // Extractions, implants, or other surgeries جراحة اسنان
            'Restorative',           // Restorative dentistry حشوات الأسنان
            'Tempromandibular',      // Tempromandibular surgery جراحة تيمورمانديبول - مفصل الفك
            'Pediatric',             // Pediatric dentistry حشوات الأطفال
            'prosthodontics',        // Prosthodontics or dentures تركيبات الأسنان
        ],
        default: 'Routine Checkup',
    },
    bookStatus: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
    cancellationReason: { type: String, required: function () { return this.bookStatus === 'Cancelled' } },
}, {
    timestamps: true,
});

// export online booking model
const OnlineBooking = mongoose.model('OnlineBooking', OnlineBookingSchema);
module.exports = OnlineBooking;