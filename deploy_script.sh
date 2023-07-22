#!/bin/bash

cd ./mysql
docker compose up -d --build 
cd ../redis
docker compose up -d --build
cd ../
docker compose up -d --build