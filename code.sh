#!/bin/bash

# Navigate to the backend directory
cd BACKEND

# Ungrade the Version of the package - Patch
npm version patch

# Get the version from package.json using 'jq'
# If jq is not installed, you might need to install it: sudo apt-get install jq
VERSION=$(jq -r '.version' package.json)

# Print the version
echo "Version from package.json: $VERSION"

#  Git tag the version
git tag -a "v$VERSION" -m "Release version $VERSION"

# Push the changes to the remote repository
git push --tags