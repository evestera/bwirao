type ResizeOptions = {
};

let resizeWorker: Worker | undefined = undefined;

export async function resizeImage(imageData: Uint8Array, options: ResizeOptions): Promise<Uint8Array> {
    if (!resizeWorker) {
        const ResizeWorker = await import('./resizeWorker.ts?worker');
        resizeWorker = new ResizeWorker.default();
    }

    return new Promise((resolve, reject) => {
        resizeWorker!.onmessage = (event) => {
            resolve(event.data);
        };
        resizeWorker!.onerror = (error) => {
            reject(error);
        };
        resizeWorker!.postMessage({ imageData, options });
    });
}