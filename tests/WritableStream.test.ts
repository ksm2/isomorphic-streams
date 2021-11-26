import { WritableStream, ReadableStream } from "..";

describe("WritableStream", () => {
  it("should support piping to a writable stream", async () => {
    let index = 0;
    const writable = new WritableStream<number>({
      write(chunk) {
        index += 1;
        expect(chunk).toBe(index);
      },
    });

    const readable = new ReadableStream<number>({
      start(controller) {
        controller.enqueue(1);
        controller.enqueue(2);
        controller.enqueue(3);
        controller.close();
      },
    });

    await readable.pipeTo(writable);

    expect.assertions(3);
  });
});
