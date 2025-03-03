#!/bin/bash

set -e

current_version=$(jq -r '.version' package.json)

IFS=. read -r major minor patch <<< "$current_version"
minor=$((minor + 1))
patch=0 # Remettre patch à zéro
new_version="${major}.${minor}.${patch}"

jq ".version = \"${new_version}\"" package.json > temp.json && mv temp.json package.json
