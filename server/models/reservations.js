const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reservationSchema = new Schema(
    {
        numberOfPeople: { type: Number, maxLength: 10, required: true },
        bookingDate: { type: String, maxLength: 100, required: true },
        bookingTime: { type: String, maxLength: 100, required: true },
        tableNumber: { type: String, maxLength: 100, required: true },
        restaurantName: { type: String, maxLength: 100, required: true },
        vicinity: { type: String, maxLength: 100, required: true },
        specialRequests: { type: String, maxLength: 100, default: '' },
        extraNotes: { type: String, maxLength: 2000, default: '' },
        // restaurantId: {
        //     type: ObjectId,
        //     ref: "Restaurant",
        // },
        // userId: {
        //     type: ObjectId,
        //     ref: "Consumer",
        // }
    },
    { versionKey: false }
);

const ReservationsModel = mongoose.model('Reservation', reservationSchema);

module.exports = ReservationsModel;
