#!/bin/bash

set -e # Arrête le script en cas d'erreur

# 1. Récupérer la version actuelle depuis package.json avec jq
current_version=$(jq -r '.version' package.json)

# 2. Incrémenter la version patch
IFS=. read -r major minor patch <<< "$current_version"
patch=$((patch + 1))
new_version="${major}.${minor}.${patch}"

# 3. Mettre à jour package.json
jq ".version = \"${new_version}\"" package.json > temp.json && mv temp.json package.json
