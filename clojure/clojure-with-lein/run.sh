#!/bin/bash

# Define the file or directory to watch
WATCHED_DIR="./src"

# Define the command to execute on file change
COMMAND_TO_RUN="lein run"

# Run inotifywait in the background to watch for changes
inotifywait -m -r -e modify,create,delete "$WATCHED_DIR" | while read -r directory events filename; do
  # Ignore events on directories
  if [ -f "$directory$filename" ]; then
    # Execute the command on file change
    eval "$COMMAND_TO_RUN"
  fi
done
