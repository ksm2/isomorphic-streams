import { ReadableStream } from "isomorphic-streams";

const SECOND = 1000;

const stream = new ReadableStream({
  start(controller) {
    setInterval(() => {
      controller.enqueue(Date.now());
    }, SECOND);
  },
});

for await (const value of stream) {
  console.log(value);
}
