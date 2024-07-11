import {resize} from 'bwirao';

self.onmessage = function (event) {
    resize(event.data.imageData, 200, 200).then((result) => {
        postMessage(result);
    });
}

