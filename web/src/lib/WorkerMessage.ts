export type ResizeOptions = {};

export type MessageToWorker = {
    type: 'RESIZE_IMAGE';
    imageData: Uint8Array;
    options: ResizeOptions;
};

export type MessageFromWorker =
    | { type: 'RESIZE_IMAGE_COMPLETE'; result: Uint8Array }
    | { type: 'ERROR'; error: unknown };
