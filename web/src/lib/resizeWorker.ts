import { resize } from 'bwirao';
import type { MessageFromWorker, MessageToWorker } from '$lib/WorkerMessage';

const postMsg: (data: MessageFromWorker) => void = postMessage;

self.onmessage = function (event: MessageEvent<MessageToWorker>) {
  resize(event.data.imageData, event.data.options.width, event.data.options.height)
    .then((result) => {
      postMsg({
        type: 'RESIZE_IMAGE_COMPLETE',
        result
      });
    })
    .catch((err) => {
      postMsg({
        type: 'ERROR',
        error: err
      });
    });
};
