import {
    getConfirmationById,
    getTicketOptionsForRoute
} from '../../models/model.js';

export default async (req, res, next) => {
    const { confirmationId } = req.params;
    const confirmation = await getConfirmationById(confirmationId);

    if (!confirmation) {
        return next();
    }

    const ticketOptions = await getTicketOptionsForRoute(confirmation.routeId);
    const ticket = ticketOptions.find(option =>
        option.class === confirmation.ticketClass
    );

    const totalPrice = ticket.price * confirmation.passengers.length;

    res.render('routes/confirm', {
        title: 'Trip Confirmation',
        confirmation,
        totalPrice
    });
};