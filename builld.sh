#!/bin/sh

# remove dist folder
rm -rf dist

# create dist folder and sub folders
mkdir dist
mkdir dist/js
mkdir dist/css

# minfication of JS files
find src/scripts/ -type f -name "*.js" ! -name "*.min.js"  -print0 | while IFS= read -rd '' file; do
    b=$(basename "$file" | cut -f 1 -d '.')
    name=$(echo "$file" | cut -f 1 -d '.')
    npx babel src/scripts/"$b".js -d lib
    npx uglifyjs -o "$PWD"/lib/"$b".min.js "$PWD"/lib/"$b".js
    mv "$PWD"/lib/"$b".min.js "$PWD"/dist/js/"$b".min.js
done

# remove lib folder
rm -rf lib

# minification of css files
find src/css/ -type f -name "*.css" ! -name "*.min.css"  -print0 | while IFS= read -rd '' file; do
    b=$(basename "$file" | cut -f 1 -d '.')
    name=$(echo "$file" | cut -f 1 -d '.')
    npx uglifycss --output "$name".min.css "$file"
    mv "$name".min.css "$PWD"/dist/css/"$b".min.css
done

# build html files
