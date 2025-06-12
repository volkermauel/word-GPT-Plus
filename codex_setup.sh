#!/bin/bash
set -euo pipefail

# Install Node.js 20 if not installed or version <18
NODE_MAJOR_REQUIRED=18

if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
else
  INSTALLED_MAJOR=$(node -v | cut -d. -f1 | tr -d 'v')
  if [ "$INSTALLED_MAJOR" -lt "$NODE_MAJOR_REQUIRED" ]; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
  fi
fi

# Install build dependencies required for node-gyp
apt-get update
apt-get install -y g++ make python3

# Enable and prepare Yarn via corepack
corepack enable
corepack prepare yarn@1.22.19 --activate

# Ensure node-gyp is available globally
yarn global add node-gyp

# Install project dependencies
yarn install --frozen-lockfile
