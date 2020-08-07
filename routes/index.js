const router = require("express").Router();

router.get("/test", (req, res) => res.end("Hello"));
module.exports = router;
