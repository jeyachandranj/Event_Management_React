const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authenticate = require("../middleware/authenticate");



router.get('/bookings', authenticate, bookingController.getBookings);
router.get('/bookingsAdmin', authenticate, bookingController.getBookingAdmin);
router.get('/bookingsHod', authenticate, bookingController.getBookingHod);

router.get('/events',  bookingController.getEvents);
router.get('/bookingsView/:bookingId',authenticate, bookingController.getBookingById);
router.get('/getRegistration/:bookingId',authenticate, bookingController.getRegistrationById);
router.get('/getStudentRegistration',authenticate, bookingController.getRegistrationByStudent);
// router.get('/bookings/:id', bookingController.getBookingById);
router.get('/bookingsFaculty',authenticate,  bookingController.getBookingByUserId);
router.post('/bookings',authenticate, bookingController.createBooking);
router.post('/eventregister',authenticate, bookingController.bookingEvent);
router.post('/send-email',authenticate, bookingController.sendingEmail);
router.put('/bookingsEdit/:bookingId',authenticate, bookingController.updateBooking);
router.put('/eventRegisterEdit/:bookingId',authenticate,bookingController.updateEventRegistration);
router.put('/eventparticipation/:bookingId',authenticate,bookingController.updateEventRegistrationStatus);
router.delete('/bookings/:bookingId',authenticate, bookingController.deleteBooking);
router.delete('/bookings/:hallId',authenticate, bookingController.deleteBookingHall);
router.post('/api/payment/orders',authenticate, bookingController.apiPayment);
router.post('/api/payment/verify',authenticate, bookingController.apiPaymentVerify);






module.exports = router;
