#!/bin/bash

set -e

# Clean
git clean -xdf

# Install
yarn install

# Lint
yarn run prettier

# Prebuild
yarn run prebuild

# Test
yarn run test | true

# Build
BUILD_VERSION=test yarn build