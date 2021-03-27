# DRM-Test-App
Node.js API and React client app to show capabilities of Shaka player with DRM licenses

## Installation

Make sure you have a local MongoDB running on your machine. You can use [Robo 3T](https://robomongo.org/), just make sure it runs on a default *localhost:27017* address.
Navigate to the server folder and make sure you have [Node.js](https://nodejs.org/en/) installed:

```bash
npm install
```

Start the server with command:
```bash
npm start
```
You should see a message like this to confirm that the server is running:

```bash
Loading Secrets.json file.
Verifying integrity of video definition: Axinom demo video - single key (DASH; cenc)
Verifying integrity of video definition: Axinom demo video - single key (HLS; cbcs)
Verifying integrity of video definition: Axinom demo video - multikey (DASH; cenc)
Verifying integrity of video definition: Axinom demo video - multikey (HLS; cbcs)
Verifying integrity of video definition: Plane video
Verifying integrity of video definition: Beach video
Server listening on port 4000
```

Now navigate to client app's folder and run the same command:

```bash
npm install

```
Then start the app:

```bash
npm start
```

## Usage

Open your browser and enter address *https:localhost:8080*.
You will see a certificate error, to mitigate this, you need to import both the server's and client's app's certificates files in their respective root directories to your browsers trusted certificates authorities or create your own certificates.

You will be greeted with this window:

![image](https://user-images.githubusercontent.com/44035175/112733591-8879cb80-8f49-11eb-9500-e30d73488665.png)




