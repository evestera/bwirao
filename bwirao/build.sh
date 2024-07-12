#!/bin/sh

wasm-pack build --target web --out-dir ./build/jpeg -- --features image/jpeg,image/jpeg
wasm-pack build --target web --out-dir ./build/png -- --features image/png,image/jpeg
wasm-pack build --target web --out-dir ./build/webp -- --features image/webp,image/jpeg
wasm-pack build --target web --out-dir ./build/tiff -- --features image/tiff,image/jpeg
