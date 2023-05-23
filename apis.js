const { log } = require("logpalette");
var express = require('express');
var router = express.Router();
let _path = process.cwd();

const { spotifydl } = require('./lib/spotify.js')


router.get('/spotifydl', async(req, res, next) => {
 url = req.query.url
if (!url) return res.json({ status : 400, message : "put the url parameter"})
if (!/open|spotify|track/.test(url)) return res.json({ status: 400, message: "provide a valid spotify link"})
spotifydl(url).then((resultado) => {
 res.json({
 status: 200,
 result: resultado
 })}).catch(e => {
    log(e, 'error')
res.json({
    status: 500,
     message: "Internal server error"
 })})})

 module.exports = router
