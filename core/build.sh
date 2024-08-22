#!/bin/sh

wasm-pack build --target web --out-dir ../wrapper/build/jpeg -- --features image/jpeg,image/jpeg
wasm-pack build --target web --out-dir ../wrapper/build/png -- --features image/png,image/jpeg
wasm-pack build --target web --out-dir ../wrapper/build/webp -- --features image/webp,image/jpeg
wasm-pack build --target web --out-dir ../wrapper/build/tiff -- --features image/tiff,image/jpeg
rm -f ../wrapper/build/*/.gitignore