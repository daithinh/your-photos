const express = require('express');
const translationService = require('./translation.service');

const ROUTES = {
    dictionary: '/dictionary',
};

module.exports = () => {
    const translationRouter = express.Router();

    translationRouter.route(ROUTES.dictionary)
        .get(translationService.getDictionary);

    return translationRouter;
};
