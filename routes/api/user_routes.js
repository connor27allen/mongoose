const router = require('express').Router();

const { User } = require('../../models');
const { handleRouteError } = require('../helpers');

//create user
router.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);

    res.json(user);
    } catch(err) {
       handleRouteError(err, res);
    }
});

//get all users
router.get('/users', async (req, res) => {
    try{
        const users = await User.findAll();

        res.json(users);
    } catch(err) {
        handleRouteError(err, res);
    }
});

module.exports = router;