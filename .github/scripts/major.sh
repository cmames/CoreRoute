#!/bin/bash

# script to change major version

set -e

current_version=$(jq -r '.version' package.json)

IFS=. read -r major minor patch <<< "$current_version"
major=$((major + 1))
minor=0 
patch=0 
new_version="${major}.${minor}.${patch}"

jq ".version = \"${new_version}\"" package.json > temp.json && mv temp.json package.json

