#!/bin/bash

# Check if the correct number of arguments are provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <source_path> <destination_path>"
    exit 1
fi

SOURCE_PATH="$1"
DESTINATION_PATH="$2"

# Check if source path exists
if [ ! -d "$SOURCE_PATH" ]; then
    echo "Source path does not exist: $SOURCE_PATH"
    exit 1
fi

# Create destination path if it does not exist
mkdir -p "$DESTINATION_PATH"

# Define the array of exclusions
EXCLUDES=(
    'node_modules'
    '.git'
    'out'
    'dist'
    'var'
    'vendor'
    '.idea'
    '.vscode'
    '.dart_tool'
    'build'
    '.angular'
    'Symfony'
    'digiTrans Assets'
    'android'
    '.lsp'
    '.clj-kondo'
    '*.bruce'
    'Project'
)

# Build the rsync exclude parameters
RSYNC_EXCLUDES=()
for EXCLUDE in "${EXCLUDES[@]}"; do
    RSYNC_EXCLUDES+=("--exclude=$EXCLUDE")
done

# Copy files, ignoring specified directories
rsync -av --progress "${RSYNC_EXCLUDES[@]}" "$SOURCE_PATH/" "$DESTINATION_PATH/"

echo "Copy completed from $SOURCE_PATH to $DESTINATION_PATH, ignoring specified directories."