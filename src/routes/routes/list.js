import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

export default async (req, res) => {
    const regions = await getListOfRegions();
    const seasons = await getListOfSeasons();
    let routes = await getAllRoutes();

    const region = typeof req.query.region === 'string'
        ? req.query.region.toLowerCase()
        : '';

    const season = typeof req.query.season === 'string'
        ? req.query.season.toLowerCase()
        : '';

    if (region && region !== 'all') {
        routes = routes.filter(route =>
            route.region.toLowerCase() === region
        );
    }

    if (season && season !== 'all') {
        routes = routes.filter(route =>
            route.bestSeason.toLowerCase() === season
        );
    }

    res.render('routes/list', {
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons
    });
};