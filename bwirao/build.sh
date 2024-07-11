#!/bin/sh

wasm-pack build --target web --out-dir ./build/jpeg -- --features image/jpeg,image/webp
wasm-pack build --target web --out-dir ./build/png -- --features image/png,image/webp
wasm-pack build --target web --out-dir ./build/webp -- --features image/webp
wasm-pack build --target web --out-dir ./build/tiff -- --features image/tiff,image/webp
