const express = require('express')
const { User, Show } = require('../models/index.js')

const router = express.Router()

// completed
router.get('/', async function (req, res) {
    const users = await User.findAll()
    res.json(users)
});

// completed
router.get('/:id', async function (req, res) {
    const number = req.params.id
    const users = await User.findByPk(number)
    res.json(users)
})

router.get('/:id/shows', async function (req, res) {
    const user = await User.findByPk(req.params.id, { include: Show })
    res.json(user.shows)
})

//  PUT /users/:id update and add a show if a user has watched it
router.put('/:id/shows/:showId', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        const show = await Show.findByPk(req.params.showId);
        if (show) {
            await user.addShow(show);
            res.json(show);
        } else {
            res.status(404).send('Show not found');
        };
    } else {
        res.status(404).send('User not found');
    };
});

module.exports = router
