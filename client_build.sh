#!/usr/bin/env bash

cd client && npm build && cp -a ~/client/build/. ~/src/main/resources/static/ && mv -v ~/src/main/resources/static/static/* ~/src/main/resources/static/ && rm ~/src/main/resources/static/static