export class ReadableStream<R> {
  [Symbol.asyncIterator](): AsyncIterator<R>;
  readonly locked: boolean;
  constructor(
    underlyingSource?: UnderlyingSource<R>,
    strategy?: QueuingStrategy<R>
  );
  cancel(reason?: any): Promise<void>;
  getReader(): ReadableStreamDefaultReader<R>;
  pipeThrough<T>(
    transform: ReadableWritablePair<T, R>,
    options?: StreamPipeOptions
  ): ReadableStream<T>;
  pipeTo(dest: WritableStream<R>, options?: StreamPipeOptions): Promise<void>;
  tee(): [ReadableStream<R>, ReadableStream<R>];
}

export class ReadableStreamDefaultReader<R> {
  read(): Promise<ReadableStreamDefaultReadResult<R>>;
  releaseLock(): void;
}

export class ReadableStreamBYOBReader {}

export class ReadableStreamBYOBRequest {}

export class ReadableByteStreamController {}

export class ReadableStreamDefaultController<R> {
  readonly desiredSize: number | null;
  close(): void;
  enqueue(chunk: R): void;
  error(e?: any): void;
}

export class TransformStream<I, O> implements ReadableWritablePair<O, I> {
  readonly readable: ReadableStream<O>;
  readonly writable: WritableStream<I>;
  constructor(
    transformer?: Transformer<I, O>,
    writableStrategy?: QueuingStrategy<I>,
    readableStrategy?: QueuingStrategy<O>
  );
}

export class TransformStreamDefaultController<O> {
  readonly desiredSize: number | null;
  enqueue(chunk: O): void;
  error(reason?: any): void;
  terminate(): void;
}

export class WritableStream<W> {
  readonly locked: boolean;
  constructor(
    underlyingSink?: UnderlyingSink<W>,
    strategy?: QueuingStrategy<W>
  );
  abort(reason?: any): Promise<void>;
  getWriter(): WritableStreamDefaultWriter<W>;
}

export class WritableStreamDefaultWriter<W> {
  readonly closed: Promise<undefined>;
  readonly desiredSize: number | null;
  readonly ready: Promise<undefined>;
  constructor(stream: WritableStream<W>);
  abort(reason?: any): Promise<void>;
  close(): Promise<void>;
  releaseLock(): void;
  write(chunk: W): Promise<void>;
}

export class WritableStreamDefaultController {
  error(e?: any): void;
}

export class ByteLengthQueuingStrategy
  implements QueuingStrategy<ArrayBufferView>
{
  readonly highWaterMark: number;
  constructor(init: QueuingStrategyInit);
  size(chunk: ArrayBufferView): number;
}

export class CountQueuingStrategy implements QueuingStrategy<any> {
  readonly highWaterMark: number;
  constructor(init: QueuingStrategyInit);
  size(chunk: any): number;
}

export class TextEncoderStream
  implements ReadableWritablePair<Uint8Array, string>
{
  readonly readable: ReadableStream<Uint8Array>;
  readonly writable: WritableStream<string>;
}

export class TextDecoderStream
  implements ReadableWritablePair<string, BufferSource>
{
  readonly readable: ReadableStream<string>;
  readonly writable: WritableStream<BufferSource>;
  constructor(label?: string, options?: TextDecoderOptions);
}

export type ReadableStreamController<T> = ReadableStreamDefaultController<T>;
export type ReadableStreamDefaultReadResult<T> =
  | ReadableStreamDefaultReadValueResult<T>
  | ReadableStreamDefaultReadDoneResult;

interface TextDecoderOptions {
  fatal?: boolean;
  ignoreBOM?: boolean;
}

interface ReadableWritablePair<R, W> {
  readable: ReadableStream<R>;
  writable: WritableStream<W>;
}

export interface UnderlyingSource<R> {
  type?: "bytes" | undefined;
  cancel?(reason: any): void | PromiseLike<void>;
  pull?(controller: ReadableStreamController<R>): void | PromiseLike<void>;
  start?(controller: ReadableStreamController<R>): void | PromiseLike<void>;
}

export interface UnderlyingSink<W> {
  type?: "bytes" | undefined;
  abort?(reason?: any): void | PromiseLike<void>;
  close?(): void | PromiseLike<void>;
  start?(controller: WritableStreamDefaultController): any;
  write?(
    chunk: W,
    controller: WritableStreamDefaultController
  ): void | PromiseLike<void>;
}

export interface TransformStreamTransformer<T, R> {
  transform(chunk: R, controller: TransformerController<T, R>): any;
}

export interface TransformerController<T, R> {
  enqueue(value: T): void;
}

export interface ReadableStreamDefaultReadDoneResult {
  done: true;
  value?: undefined;
}

export interface ReadableStreamDefaultReadValueResult<T> {
  done: false;
  value: T;
}

export interface QueuingStrategy<T> {
  highWaterMark?: number;
  size?(chunk: T): number;
}

interface QueuingStrategyInit {
  highWaterMark: number;
}
