# Browser/WebAssembly Image Resizing and Optimization (bwirao)

```ts
function resize(imageData: Uint8Array, width: number, height: number): Promise<Uint8Array>;
```

The library contains multiple smallish WebAssembly bundles. 
When calling `resize`, a WebAssembly bundle is loaded, based on the format of the image.
Output bytes is an image in JPEG format.

This is just an initial testing release, and there is no guarantee any of the API will stay the same in future versions.