#!/bin/sh

npm install
npm run server:build
node server/index.js &
npm start
