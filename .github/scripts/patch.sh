#!/bin/bash

# script to change patch version

set -e # Arrête le script en cas d'erreur

current_version=$(jq -r '.version' package.json)

IFS=. read -r major minor patch <<< "$current_version"
patch=$((patch + 1))
new_version="${major}.${minor}.${patch}"

jq ".version = \"${new_version}\"" package.json > temp.json && mv temp.json package.json
