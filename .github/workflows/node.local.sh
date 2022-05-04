#!/bin/bash

set -e

# Clean
git clean -xdf

# Install
yarn install

# Depcheck
yarn run depcheck | true

# Lint
yarn run prettier | true


# Prebuild
yarn run prebuild

# Test
yarn run test | true

# Build
BUILD_VERSION=test yarn build