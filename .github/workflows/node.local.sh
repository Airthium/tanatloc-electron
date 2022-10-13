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

# Build
BUILD_VERSION=test yarn dist