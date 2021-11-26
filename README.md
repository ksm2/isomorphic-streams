# isomorphic-streams

[![Node.js CI](https://github.com/ksm2/isomorphic-streams/actions/workflows/node.js.yml/badge.svg)](https://github.com/ksm2/isomorphic-streams/actions/workflows/node.js.yml)
[![NPM version](https://img.shields.io/npm/v/isomorphic-streams)](https://www.npmjs.com/package/isomorphic-streams)
[![license](https://img.shields.io/github/license/ksm2/isomorphic-streams)](https://opensource.org/licenses/MIT)
[![TypeScript types](https://img.shields.io/npm/types/isomorphic-streams)](https://github.com/ksm2/isomorphic-streams/blob/main/index.d.ts)

> Isomorphic [WHATWG Streams API] package for browser and Node.js

This package has

- **zero dependencies**
- provides **TypeScript typings**
- supports `ReadableStream`, `WritableStream` and `TransformStream`

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Install

Use either

    yarn add isomorphic-streams

or

    npm install isomorphic-streams

## Usage

**In the browser:** Instead of using the global `ReadbaleStream` or `window.ReadableStream`, import from this package instead.

**In Node.js:** Instead of importing `node:stream/web` or requiring `stream/web`, import from this package instead.

The following code will work in both Node.js and the browser:

```js
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
```

[More examples][examples]

## Contributing

This project is open to feedback and contributions, please open an issue.

`isomorphic-streams` follows the [Contributor Covenant] Code of Conduct.

## License

MIT © 2021 Konstantin Möllers, see [LICENSE].

[whatwg streams api]: https://streams.spec.whatwg.org/
[license]: https://github.com/ksm2/isomorphic-streams/blob/main/LICENSE
[contributor covenant]: https://github.com/ksm2/isomorphic-streams/blob/main/CODE_OF_CONDUCT.md
[examples]: https://github.com/ksm2/isomorphic-streams/tree/main/examples
