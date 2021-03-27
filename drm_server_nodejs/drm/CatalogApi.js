const { response } = require("express");

(function () {
	"use strict";

	let express = require("express");
	let videoDatabase = require("./VideoDatabase");
	const jwt = require('jsonwebtoken');
	const db = require("../_helpers/db")
	const { secret } = require('../config.json');
	const Roles = require('../_helpers/role');


	module.exports = {
		"createRouter": function createRouter() {
			let router = express.Router();

			// This API call returns a JSON list with basic info about all the videos on the website.
			router.get("/all", function processGet(request, response) {
				// We do not want our API calls to get cached.
				response.header("Cache-Control", "no-cache");
				
				let videoList = [];

				videoDatabase.getAllVideos().forEach(function mapVideo(video) {
					// Only name, URL and an optional list tags are exposed to the browser.
					// Everything else is for internal use only.
					videoList.push({
						"name": video.name,
						"url": video.url,
						"tags": video.tags
					});
				});
				
				

				response.json(videoList);
			});
			router.get("/info/:name", function(request, response) {
				// We do not want our API calls to get cached.
				response.header("Cache-Control", "no-cache");

				const video = videoDatabase.getVideoByName(request.params.name)

				const formated = {
					name: video.name,
					url: video.url
				}

				response.json(formated);
			})
			// returns only free videos
			router.get("/free", function processGet(request, response) {
				// We do not want our API calls to get cached.
				response.header("Cache-Control", "no-cache");
				
				let videoList = [];

				videoDatabase.getAllVideos().forEach(function mapVideo(video) {
					// Only name, URL and an optional list tags are exposed to the browser.
					// Everything else is for internal use only.
					if (!video.license || video.license === "free")
					videoList.push({
						"name": video.name,
						"url": video.url,
						"tags": video.tags
					});
				});				

				response.json(videoList);
			});
			// returns only premium videos
			router.get("/premium", async function processGet(request, response) {
				// We do not want our API calls to get cached.
				response.header("Cache-Control", "no-cache");
				
				if (!request.header('Authorization')){
					response.status(401).send("Unauthorized to view these items")
					return;
				}

				const token = request.header('Authorization').replace('Bearer ', '');
				const decoded = jwt.verify(token, secret);
				const account = await db.Account.findById(decoded.id);

				if (account.role == Roles.User) {
					response.status(401).send("Unauthorized to view these items")
					return;
				}


				let videoList = [];

				videoDatabase.getAllVideos().forEach(function mapVideo(video) {
					// Only name, URL and an optional list tags are exposed to the browser.
					// Everything else is for internal use only.
					if (video.license === "premium")
					videoList.push({
						"name": video.name,
						"url": video.url,
						"tags": video.tags
					});
				});				

				response.json(videoList);
			});
			return router;
		}
	};
})();