// IMPORTS
const express = require('express')
const router = express.Router()
const Notice = require('../models/Notice')

const getAll = async (req, res, next) => {
    try {
        let notice = await Notice
            .query()
            .withGraphFetched('user')
            .debug(true);

        console.log(notice);

        res.status(200).json(notice)
    } catch (error) {
        console.log(error);
    }
}

const getById = async (req, res, next) => {
    try {
        let notice = await Notice
            .query()
            .withGraphFetched('user')
            .findById(parseInt(req.params.id, 10))
            .debug(true);

        console.log(notice);

        res.status(200).json(notice)
    } catch (error) {
        console.log(error);
    }
}

const create = async (req, res, next) => {
    try {
        let noticeCreated = await Notice
            .query()
            .insert({
                title: req.body.title,
                description: req.body.description,
                user_id: req.body.user_id
            })
            .debug(true);

        if (noticeCreated) {
            let notice = await Notice
                .query()
                .withGraphFetched('user')
                .findById(parseInt(noticeCreated.id, 10))
                .debug(true);

            res.status(200).json(notice)
        }

        console.log(noticeCreated);

        res.status(400).json({ mesage: 'failed to created' })
    } catch (error) {
        console.log(error);
    }
}

// EXPORTS
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);


module.exports = {
    router: router
}