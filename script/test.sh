#!/bin/bash

mocha_option="--require ./node_modules/babel-register --recursive ./test/src -R spec"
./node_modules/.bin/istanbul cover ./node_modules/mocha/bin/_mocha  -- $mocha_option
