#!/bin/bash

# Check if the configuration file argument is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <path_to_sea_config.json>"
  exit 1
fi

SEA_CONFIG=$1

# Validate if the configuration file exists
if [ ! -f "$SEA_CONFIG" ]; then
  echo "Configuration file not found: $SEA_CONFIG"
  exit 1
fi

# Generate the BLOB to be injected
node --experimental-sea-config "$SEA_CONFIG"

# Create a copy of the Node.js executable and name it 'node'
cp $(command -v node) node

# Extract the output file name from the configuration file
BLOB_FILE=$(jq -r '.output' "$SEA_CONFIG")

# Inject the BLOB into the copied binary
npx postject node NODE_SEA_BLOB "$BLOB_FILE" \
    --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2

# Make the new executable runnable
chmod +x node

