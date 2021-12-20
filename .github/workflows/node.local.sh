#!/bin/bash

set -e

# Install
yarn install

# Lint
yarn run prettier

# Test
yarn run test | true

# Prebuild
yarn run prebuild
