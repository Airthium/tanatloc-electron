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

# Test
yarn run test | true

# Prebuild
yarn run prebuild

# Build
BUILD_VERSION=test yarn build