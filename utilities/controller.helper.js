let fn = {}

fn._get_all = async (req, res, Model, eager) => {
    try {
        //parse search parameter
        let search = req.query.search;
        let order = req.query.order;
        let sort = req.query.sort;
        let fields = req.query.fields ? req.query.fields.split(',') : undefined;


        let pageNo = parseInt(req.query.page, 10);

        if (isNaN(pageNo) || pageNo < 1) {
            pageNo = 1;
        }

        let limit = parseInt(req.query.limit, 10);

        if (isNaN(limit)) {
            limit = 10;
        } else if (limit > 50) {
            limit = 50;
        } else if (limit < 1) {
            limit = 1;
        }

        let offset = pageNo - 1;


        console.log(offset, limit)

        let query = Model
            .query();

        if (search != undefined || fields != undefined) {
            fields.forEach((field) => {
                query.orWhere(field, 'like', '%' + search + '%');
            })
        }

        if (sort != undefined) {
            if (order != undefined) {
                query.orderBy(sort, order);
            }

        }

        if (eager) {
            query.withGraphFetched(eager)
        }

        let dataset = await query
            .page(offset, limit)
            .debug(true);

        let response = {
            data: dataset.results,
            paged: {
                page: pageNo,
                pageSize: limit,
                rowCount: dataset.total,
                pageCount: Math.ceil(dataset.total / limit)
            },
            _self: "http://localhost:3000/api/countries"
        };

        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

fn._get_by_id = async (req, res, Model, eager) => {

    try {

        let id = req.params.id

        let query = Model
            .query();


        if (eager) {
            eager.forEach(e => {
                query.eager(e)
            });
        }

        let result = await query
            .findById(id)
            .debug(true);

        if (result) {

            return res.status(200).json(result);
        }

        res.status(400).json({
            message: 'not found with id ' + id
        })
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

fn._create = async (req, res, Model, fields) => {

    try {
        // let mapped = fields.reduce((acc, item) => {
        //     return {
        //         ...acc,
        //         [item]: req.body[item],
        //     };
        // }, {});


        let result = await Model
            .query()
            .insert(req.body)
            .debug(true);

        res.status(200).json({ data: result, _self: "http://localhost:3000/api/countries/" })
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

fn._update = async (req, res, Model, fields) => {
    try {
        let id = req.params.id
        let result = await Model
            .query()
            .findById(id).debug(true);



        if (result) {
            let mapped = fields.reduce((acc, item) => {
                return {
                    ...acc,
                    [item]: req.body[item] || result[item],
                };
            }, {});

            let resultUpdate = await Model
                .query()
                .patch(mapped)
                .where({ id: id });

            return res.status(204).json(resultUpdate);
        }

        res.status(400).json({
            message: 'not found with id ' + id
        })

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

fn._delete = async (req, res, Model) => {
    try {
        let id = req.params.id
        let result = await Model
            .query()
            .findById(id).debug(true);

        if (result) {
            let resultDelete = await Model
                .query()
                .deleteById(id)

            return res.status(204).json(resultDelete);
        }

        res.status(400).json({
            message: 'not found with id ' + id
        })

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

// EXPORTS
module.exports = {
    fn: fn
}