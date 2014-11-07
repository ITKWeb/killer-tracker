#!/bin/sh

cd webapp/killerHD-server
npm install
cd ../killerHD-client-ng
npm install
cd app/
bower install
