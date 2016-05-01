#!/bin/bash

rm -rf out/esdoc
mkdir -p out/esdoc
./node_modules/.bin/esdoc -c esdoc.json
cp -a ./misc ./out/esdoc/
