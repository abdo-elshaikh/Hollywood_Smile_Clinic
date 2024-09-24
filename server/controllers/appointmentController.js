const Appointment = require('../models/Appointment');

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('patient')
            .populate('department')
            .populate('service')
            .populate('createdBy')
            .populate('doctor')
            .$where('this.doctor && this.doctor.role == "doctor"');
        if (appointments) {
            res.status(200).json(appointments);
        } else {
            res.status(204).json({ message: 'No appointments found' });
        }
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(400).json({ message: 'Invalid ObjectId' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

const getAppointmentByPatient = async (req, res) => {
    const patientId = req.params.id;
    try {
        const appointments = await Appointment.find({ patient: patientId })
            .populate('patient')
            .populate('department')
            .populate('service')
            .populate('doctor')
            .populate('createdBy');
        if (appointments) {
            res.status(200).json(appointments);
        } else {
            res.status(204).json({ message: 'No appointments found for this patient' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAppointmentByDoctor = async (req, res) => {
    const doctorId = req.params.id;
    try {
        const appointments = await Appointment.find({ doctor: doctorId })
            .populate('patient')
            .populate('department')
            .populate('service')
            .populate('doctor')
            .populate('createdBy');
        if (appointments) {
            res.status(200).json(appointments);
        } else {
            res.status(204).json({ message: 'No appointments found for this doctor' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAppointmentByDepartment = async (req, res) => {
    const departmentId = req.params.id;
    try {
        const appointments = await Appointment.find({ department: departmentId })
            .populate('patient')
            .populate('department')
            .populate('service')
            .populate('doctor')
            .populate('createdBy');
        if (appointments) {
            res.status(200).json(appointments);
        } else {
            res.status(204).json({ message: 'No appointments found for this department' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateAppointmentStatus = async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;
    try {
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        appointment.status = status;
        await appointment.save();
        res.status(200).json({ message: 'Appointment status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAppointment = async (req, res) => {
    const id = req.params.id;
    try {
        const appointment = await Appointment.findByIdAndDelete(id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createAppointment = async (req, res) => {
    const appointment = req.body;
    try {
        const newAppointment = new Appointment.create(appointment);
        if (newAppointment) {
            res.status(201).json(newAppointment);
        } else {
            res.status(400).json({ message: "Failed to create appointment" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateAppointment = async (req, res) => {
    const id = req.params.id;
    const appointment = req.body;
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(id, appointment, { new: true });
        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json(updatedAppointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllAppointments,
    getAppointmentByPatient,
    getAppointmentByDoctor,
    getAppointmentByDepartment,
    updateAppointmentStatus,
    deleteAppointment,
    createAppointment,
    updateAppointment
}
