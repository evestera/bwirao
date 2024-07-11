import init, {resize} from 'bwirao';

self.onmessage = function (event) {
    init().then(() => {
        const result = resize(event.data.imageData, 200, 200);
        postMessage(result);
    });
}

