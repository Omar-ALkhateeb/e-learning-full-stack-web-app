const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
app = express();
// app.use(serveStatic(path.join(__dirname, 'dist')));
// app.get('*', function (req, res) {
//     express.static(__dirname + 'dist');
// });
// app
//     .use('*', express.static('dist'));
app.use('/*', function (req, res) {
    express.static('dist');
});
// app.route('/*')
//     .get(function (req, res) {
//         res.sendFile(path.join(__dirname + '/dist/index.html'));
//     });
const port = process.env.PORT || 5000;
app.listen(port);