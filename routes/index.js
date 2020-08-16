const { Router } = require("express");
const router = new Router();

router.get("/test", (req, res) => res.end("Hello"));

module.exports = router;
