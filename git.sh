#!/bin/bash

COMMITTEXT=$(node -p "require('./package.json').version");

git add .
git commit -m "版本${COMMITTEXT}"
git push origin master