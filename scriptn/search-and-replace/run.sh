#!/bin/bash

# Function to read key-value pairs from the config.txt file
function read_config() {
  while IFS='=' read -r key value; do
    config["$key"]="$value"
  done < "config.txt"
}

# Function to replace keys with values in a given file
function replace_keys() {
  filename="$1"
  temp_file="temp_file.txt"

  # Loop through the keys and replace them with values in the file
  for key in "${!config[@]}"; do
    value="${config[$key]}"
    sed -i "s/\${$key}/$value/g" "$filename"
  done
}

# Main script
config=()

# Read key-value pairs from config.txt
read_config

# List of files to process (replace with your file names)
files=("file1.txt" "file2.txt" "file3.txt")

# Loop through the files and replace keys with values
for file in "${files[@]}"; do
  replace_keys "$file"
done

