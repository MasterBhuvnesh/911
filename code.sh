#!/bin/bash

# This script automates version bumping, Git tagging, and pushing to the remote repository.
# It assumes this script is located in the project's root directory,
# and the 'BACKEND' directory is also directly within the root.

# Usage: ./code.sh [patch|minor|major]
# Default: patch

# Determine the version bump type.
# If an argument is provided, use it; otherwise, default to 'patch'.
VERSION_TYPE=${1:-patch}

# Validate the provided version type.
if [[ ! "$VERSION_TYPE" =~ ^(patch|minor|major)$ ]]; then
  echo "Error: Invalid version type specified. Please use 'patch', 'minor', or 'major'."
  exit 1
fi

# Get the directory of the script. Since it's in the root, this will be the root directory.
SCRIPT_DIR=$(dirname "$0")
echo "DEBUG: Script is running from: $(pwd)" # Debug: show current working directory
echo "DEBUG: SCRIPT_DIR (where code.sh is located) is: $SCRIPT_DIR" # Debug: show script's directory

# Define the path to the BACKEND directory relative to the script's location (the root).
BACKEND_DIR="$SCRIPT_DIR/BACKEND"
echo "DEBUG: Target BACKEND_DIR for cd is: $BACKEND_DIR" # Debug: show target directory for cd

# Change to the BACKEND directory to ensure npm commands run in the correct context.
# Exit if navigation fails.
cd "$BACKEND_DIR" || { echo "Error: Could not navigate to $BACKEND_DIR. Please ensure 'BACKEND' directory exists as a sibling to 'code.sh'."; exit 1; }
echo "DEBUG: Successfully changed directory to: $(pwd)" # Debug: show current working directory after cd

# Check if package.json exists in the BACKEND directory.
if [ ! -f "package.json" ]; then
  echo "Error: package.json not found in $(pwd)"
  exit 1
fi

# Upgrade the version of the package using npm version command with the specified type.
# This command increments the specified version (patch, minor, or major)
# and automatically commits the change to package.json and package-lock.json.
# We use --no-git-tag-version to prevent npm from creating a git tag immediately,
# as we will create our own annotated tag later.
echo "Bumping package version ($VERSION_TYPE)..."
npm version "$VERSION_TYPE" --no-git-tag-version

# Get the updated version from package.json using 'jq'.
# 'jq' is a lightweight and flexible command-line JSON processor.
# If 'jq' is not installed, you might need to install it on your system (e.g., sudo apt-get install jq).
echo "Retrieving updated version from package.json..."
VERSION=$(jq -r '.version' package.json)

# Print the updated version to the console.
echo "New version from package.json: $VERSION"

# Add the modified package.json and package-lock.json (if present) to the Git staging area.
echo "Staging package.json changes..."
git add package.json
if [ -f "package-lock.json" ]; then
  git add package-lock.json # Corrected to package-lock.json
fi

# Commit the version bump.
echo "Committing version bump..."
git commit -m "Bump version to v$VERSION"

# Create a Git tag for the new version.
# '-a' creates an annotated tag, which is recommended for releases.
# The tag name is prefixed with 'v' (e.g., v1.0.1).
# '-m' provides a message for the tag.
echo "Creating Git tag v$VERSION..."
git tag -a "v$VERSION" -m "Release version $VERSION"

# Push the committed changes and the new tag to the remote repository.
# 'git push origin HEAD' pushes the current branch's commits to the 'origin' remote.
# '--tags' pushes all local tags to the remote.
echo "Pushing changes and tags to remote repository..."
git push origin HEAD --tags

echo "Script finished successfully. Version v$VERSION released."
