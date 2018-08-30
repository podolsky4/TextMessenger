#!/bin/bash

if [[ $TRAVIS_BRANCH == 'master' ]]
  sonar-scanner
fi