// IMPORTS
const express = require('express')
const router = express.Router()
const Comment = require('../models/Comment')

const getAll = async (req, res, next) => {
    try {
        let comments = await Comment
            .query()
            .withGraphFetched('user')
            .where({ notice_id: parseInt(req.params.noticeId, 10) })
            .debug(true);

        console.log(comments);

        res.status(200).json(comments)
    } catch (error) {
        console.log(error);
    }
}

const getById = async (req, res, next) => {
    try {
        let comment = await Comment
            .query()
            .withGraphFetched('user')
            .findById(parseInt(req.params.id, 10))
            .debug(true);

        console.log(comment);

        res.status(200).json(comment)
    } catch (error) {
        console.log(error);
    }
}

const create = async (req, res, next) => {
    try {
        console.log(req.body)
        let commentCreated = await Comment
            .query()
            .insert({
                user_id: req.body.user_id,
                notice_id: req.body.notice_id,
                message: req.body.message
            })
            .debug(true);

        if (commentCreated) {
            let comment = await Comment
                .query()
                .withGraphFetched('user')
                .findById(commentCreated.id)
                .debug(true);

            console.log(comment);
            res.status(200).json(comment)
        }

        console.log(commentCreated);
        res.status(400).json({message:'failed to create'})

    } catch (error) {
        console.log(error);
    }
}

// EXPORTS
router.get('/notice/:noticeId', getAll);
router.get('/:id', getById);
router.post('/', create);


module.exports = {
    router: router
}