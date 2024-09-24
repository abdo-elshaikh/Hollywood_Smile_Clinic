const allPermissions = [
    // user permissions
    'getUsers', 'getuser', 'updateUser', 'deleteUser', 'getUserByEmail', 'changeUserStatus', 'changeUserRole',
    // appointment permissions
    'getAppointments', 'createAppointment', 'updateAppointment', 'deleteAppointment', 'getAppointmentsByPatient', 'getAppointmentsByDoctor',  'updateAppointmentStatus',
    // billing permissions
    'getBillings', 'createBilling', 'updateBilling', 'deleteBilling', 'getBillingByPatient', 'applyDiscount', 'addPayment', 'getBillingById',
    // department permissions
    'getDepartments', 'createDepartment', 'updateDepartment', 'deleteDepartment', 'getDepartmentById',
    // online booking permissions
    'getOnlineBookings', 'changeStatusBooking', 'updateOnlineBooking', 'deleteOnlineBooking', 'getOnlineBookingById',
    // patient permissions
    'getPatients', 'createPatient', 'updatePatient', 'deletePatient', 'getPatientById', 'getPatientByName', 'getPatientByCode', 'getPatientByPhone',
    // role permissions
    'getRolePermissions', 'addRolePermissions', 'updateRolePermissions', 'getPermissionsByRole',
    // service permissions
    'getServices', 'createService', 'updateService', 'deleteService', 'getServiceById', 'addManyServices',
    // treatment permissions
    'getAllTreatments', 'getTreatmentById', 'updateTreatment', 'deleteTreatment', 'createTreatment',
    // treatment category permissions
    'getAllTreatmentCategories', 'getTreatmentCategoryById', 'createTreatmentCategory', 'updateTreatmentCategory', 'deleteTreatmentCategory',
    // treatment plan permissions
    'getAllTreatmentPlans', 'getTreatmentPlanById', 'createTreatmentPlan', 'updateTreatmentPlan', 'deleteTreatmentPlan',
];

module.exports = allPermissions;