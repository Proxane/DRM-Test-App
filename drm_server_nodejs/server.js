require('rootpath')();
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs')
const https = require('https')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// api routes
app.use('/accounts', require('./accounts/accounts.controller'));

// swagger docs route
app.use('/api-docs', require('_helpers/swagger'));

// global error handler
app.use(errorHandler);

//drm stuff
let secretManagement = require("drm/SecretManagement");
secretManagement.tryLoadSecrets();
// At /api/catalog is the catalog API that provides data for the frontend.
let catalogApi = require("drm/CatalogApi");
app.use("/video/catalog", catalogApi.createRouter());
// At /api/authorization is the Secure Token Service.
let secureTokenService = require("drm/SecureTokenService");
app.use("/video/authorization", secureTokenService.createRouter());

//Serve video files
app.use("/videos", express.static(__dirname + '/videos'));

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}, app)
.listen(4000, () => {
    console.log("Server listening on port 4000")
})
