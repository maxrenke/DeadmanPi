# DeadmanPi

## Overview

This project was submitted to the [HackDartmouth III](hackdartmouth.io) event held on September 24 - 25, 2016.

The goal of this project is to use a **Raspberry Pi 3** board along with **GrovePi** sensors to create a **Node.js** server that has a hard-ware **DEADMAN** switch. If certain physical triggers are detected by the **Raspberry Pi** then the sever will delete all of the files on the server. Originally, this project was meant to interface with the document sharing API at [IntraLinks](https://developers.intralinks.com) but this project still serves as a proof of concept of a server with a physical **DEADMAN** switch attached.

This project was built with **Raspberry Pi 3**, **GrovePi Board**, **GrovePi Sensors**, **Node.js**, **Python**, and **Swagger.io**.

**Node.js** powers the server as well as the RESTful API (which is powered by **Swagger.io**)

**Python** powers the **DEADMAN** switch.

## Build Instructions

1. Run 

  **node server.js**
  
2. Run 

  **cd node-file-manager**

  **cd lib**
  
  **npm install**
  
  **node --harmony index.js -d /home/pi/DeadmanPi/files**
  
3. Run

  **cd deadman-pi**
  
  **swagger project start**

4. Run

  **python deadman.py**

## Useful Links

<http://localhost:8080> - Deadman Server Page (Node.js)

<http://localhost:5000> - Node File Manager Page (Node.js)

<http://localhost:10010> - RESTful API powered by Swagger.io

## Setting Up the Pi

Everything currently runs on localhost.

Connect the **GrovePi Piezo Vibration Sensor** to **AO** on the **GrovePi Board**

Connect the **GrovePi Light Sensor** to **A1** on the **GrovePi Board**

Connect the **GrovePi Button** to **D3** on the **GrovePi Board**

## Using the Pi

Make sure **deadman.py** is running.

Vibrating the **GrovePi Piezo Vibration Sensor** will trigger a **DEADMAN**

Covering the **GrovePi Light Sensor** will trigger a **DEADMAN**

Holding the **GrovePi Button** will trigger a **RESET** (button must be pressed for at least 0.5 seconds)

## API Documentation

Run **swagger project edit** inside **deadman-pi/**

## Using the API

**curl http://localhost:10010/status; echo**

"Online"

**curl -H 'Content-Type: application/json' -X POST http://localhost:10010/kill; echo**

"Killed"

**curl http://localhost:10010/status; echo**

"Offline"

**curl -H 'Content-Type: application/json' -X POST http://localhost:10010/reset; echo**

"Reset"

## Dependencies

### Node.js

https://nodejs.org/en/

### Node File Manager

Used as a temporary file management system on the server

https://www.npmjs.com/package/node-file-manager

https://github.com/efeiefei/node-file-manager.git

### GrovePi

Python and Node.js libraries for GrovePi board sensors

https://github.com/DexterInd/GrovePi


### Swagger.io

https://github.com/swagger-api/swagger-node
