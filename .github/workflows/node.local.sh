#!/bin/bash

set -e

# Clean
#git clean -xdf

# Install
yarn install

# Depcheck
yarn run depcheck

# Lint
yarn run prettier

# Test
yarn run test

# Build
BUILD_VERSION=test yarn dist
