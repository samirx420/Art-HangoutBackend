// IMPORTS
const express      = require('express')
const router       = express.Router()
const jsonwebtoken = require('jsonwebtoken');
const util         = require('util');
const signJwt      = util.promisify(jsonwebtoken.sign);
const crypt        = require('crypto');
const User         = require('../models/User')

const login = async (req, res, next) => {
    const credentials = req.body;
    console.log(credentials.username, credentials.password);
    try {
        console.log("fetching user");
        let user = await User
            .query()
            .first()
            .where('username', credentials.username)
            .withGraphFetched('roles')
            .limit(1)
            .debug(true);

        console.log(user);

        if (!user) {
            console.log("user is null");
            res.status(403).json({ status: 403, message: 'user not found' });
        } else {
            console.log("user is available");
            let response = {
                id            : user.id,
                username      : user.username,
                passwordDigest: user.password_digest,
                roles         : user.roles,
            }
            console.log("building response");
            loginAndBuildResponse(credentials, response, res);
        }
    } catch (error) {
        console.log(error);
        next({ status: 403, message: 'Login failed' });
    }

}

const loginAndBuildResponse = async (credentials, user, res, next) => {
    try {

        const jwtToken = await attempLogin(credentials, user);

        let response = {
            id      : user.id,
            username: user.username,
            roles   : user.roles,
            token   : jwtToken
        };
        console.log('response', response)
        res.status(200).json(response);

    } catch (error) {
        console.log(error)
        res.status(403).json({ message: 'Username and password does not match' });
    }
}

const attempLogin = async (credentials, user) => {
    const passwordD       = user.passwordDigest;
    const hashed          = await hash(credentials.password);
    const isPasswordValid = (passwordD === hashed);

    if (!isPasswordValid) {
        throw new Error("Password Invalid");
    }
    return createSessionToken(user);
}

const hash = async (password) => {
    const token = crypt.createHash('sha256').update(password).digest('hex');
    return token;
}

const createSessionToken = async (user) => {
    console.log('createSessionToken user', user);
    return signJwt({
        role: user.role
    },
        'secret', {
        expiresIn: 7200,
        subject  : user.id.toString()
    });

}


const signUp = async (req, res, next) => {
    try {
        let user = await User
            .query()
            .first()
            .where({ username: req.body.username })
            .limit(1)
            .debug(true);

        if (user) {
            next({ status: 403, message: 'user already exists.' });
        }

        let hashed       = await hash(req.body.password);
        let userCreate = await User
            .query()
            .insert({
                username          : req.body.username,
                first_name        : req.body.first_name,
                last_name         : req.body.last_name,
                password_digest   : hashed,
                registration_token: req.body.registration_token ? req.body.registration_token: '',
            }).debug(true);

        delete userCreate["password_digest"];
        res.status(201).json(userCreate);
    } catch (error) {
        console.log(error)
        res.status(400).Json({ status: 400, message: error });
    }
}
// /**
//  * GET ALL User
//  */
// router.get('/', (req, res) => fn._get_all(req, res, User, '[address]'))

// /**
//  * GET BY ID
//  */
// router.get('/:id', async (req, res) => fn._get_by_id(req, res, User))

// /**
//  * CREATE User
//  */
// router.post('/', async (req, res) => fn._create(req, res, User))

// /**
//  * UPDATE User
//  */
// router.put('/:id', async (req, res) => fn._update(req, res, User, ['username', 'password', 'first_name', 'last_name', 'avatar_path', 'contact_no', 'address_id']))

// /**
//  * DELETE User
//  */
// router.delete('/:id', async (req, res) => fn._delete(req, res, User))

// EXPORTS
router.post('/login', login);
router.post('/signup', signUp);


module.exports = {
    router: router
}