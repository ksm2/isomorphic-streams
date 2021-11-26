import { ReadableStream } from "..";
import { expectStreamOf } from "./tools";

describe("ReadableStream", () => {
  it("should support an empty stream", async () => {
    const stream = new ReadableStream<never>({
      start(controller) {
        controller.close();
      },
    });

    for await (const _ of stream) {
      fail();
    }

    expect.assertions(0);
  });

  it("should stream fixed data", async () => {
    const stream = new ReadableStream<number>({
      start(controller) {
        controller.enqueue(1);
        controller.enqueue(2);
        controller.enqueue(3);
        controller.close();
      },
    });

    await expectStreamOf(stream, 1, 2, 3);
  });

  it("should pull for data", async () => {
    const stream = new ReadableStream<number>({
      start(controller) {
        expect(controller.desiredSize).toBe(1);
        controller.enqueue(1);
        expect(controller.desiredSize).toBe(0);
        controller.enqueue(2);
        expect(controller.desiredSize).toBe(-1);
      },
      pull(controller) {
        expect(controller.desiredSize).toBe(1);
        controller.enqueue(3);
        controller.close();
      },
    });

    await expectStreamOf(stream, 1, 2, 3);
    expect.assertions(5);
  });
});
