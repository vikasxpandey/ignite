const express = require('express');

const router = express.Router();

// @Route  GET api/users/test
// @desc   Test users route
// @access Public

router.get('/test', (req, res) => res.json({
    msg: "User works"
}));

module.exports = router;