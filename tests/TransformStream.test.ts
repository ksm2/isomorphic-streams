import { ReadableStream, TransformStream } from "..";
import { expectStreamOf } from "./tools";

describe("TransformStream", () => {
  it("should pipe a stream through a transform stream", async () => {
    const stream = new ReadableStream<string>({
      start(controller) {
        controller.enqueue("a");
        controller.enqueue("b");
        controller.enqueue("c");
        controller.close();
      },
    });

    const transform = new TransformStream<string, string>({
      transform(chunk, controller) {
        controller.enqueue(chunk.toUpperCase());
      },
    });

    const transformed = stream.pipeThrough(transform);

    await expectStreamOf(transformed, "A", "B", "C");
  });
});
