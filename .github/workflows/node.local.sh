#!/bin/bash

set -e

# Install
yarn

# Lint
yarn prettier

# Test
yarn test | true

# Prebuild
yarn prebuild
