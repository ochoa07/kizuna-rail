import { getCompleteRouteDetails } from '../../models/model.js';

export default async (req, res, next) => {
    const { routeId } = req.params;
    const details = await getCompleteRouteDetails(routeId);

    if (!details) {
        return next();
    }

    res.render('routes/details', {
        title: 'Route Details',
        details
    });
};