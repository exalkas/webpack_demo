const express = require('express');


const app = express();


/**
 * ALL ROUTE STUFF ABOVE THIS PART!!!!
 * OTHERWISE app.get('*') will serve first
 */

if (process.env.NODE_ENV !== 'production') {
    const  webpackMiddleware = require('webpack-dev-middleware'); // intercepts incoming requests and passes them through to Webpck

    const webpack = require('webpack'); // It compiles all app assets 
    const webpackConfig = require('./webpack.config.js'); // configuration for webpack

    app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
    app.use(express.static('dist')); // in case of production, pass the static page

    app.get('*', (req, res) => { // send index.html to anyone makes a get request to any route of this server
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    })
}
///////////////////////////////////////////////////////////////

app.listen(process.env.PORT || 3050, ()=> console.log('Listening on port 3050'));