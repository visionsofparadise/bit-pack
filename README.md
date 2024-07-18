# minibit

Compression and decompression of data described by JSON Schema.

```
npm install minibit
```

MiniBit allows you to reuse validation JSON Schema to compress data to a smaller size than JSON serialization.

Typically, you can compress data to as little as 30% the size of arbitrary serialization such as JSON stringification and message pack.

This is achieved by:
- Prioritizing minimal bit information over byte alignment.
- Encoding content encoded strings and formats as bytes.
- Compacting integer values used for lengths and counts down to exact bit depths based on expected ranges.
- Storing references to const, enum and null values instead of actual values.

## Usage

```js
import { MiniBit } from 'minibit';

const data = {
   // data
};

const schema = {
   // JSON Schema
};

// Load schemas and referenced schemas
const miniBit = new MiniBit([schema])

const buffer = miniBit.encode(data, schema['$id'])

const dataB = miniBit.decode(buffer, schema['$id'])
```

## API

### Constructor

#### `miniBit = new MiniBit(schema, [...referencedSchemas])`

Create a new miniBit instance.

### Instance Methods

#### `buffer = miniBit.encode(data, schemaId)`

Encodes data to buffer.

#### `data = miniBit.decode(buffer, schemaId)`

Decodes data from buffer.

## Backwards Compatibility

The following changes in schema break backwards compatibility for encoded data:
- Adding to object properties, enums, array prefix items anywhere other than at the end.
- Removing object properties, enums, array prefix items.
- Changing order of object properties, enums, array prefix items.
- Changing length/quantity properties such as minItems, maxItems, minLength, maxLength, minimum, maximum, etc.
- Changing string contentEncoding or format.

It is recommended to make the root schema an object, only add new properties and mark old properties as deprecated.

MiniBit does not validate data and treats object properties as optional. Decoding will not fail if a deprecated properties is not present.

## Benchmarks

Benchmarks use a sample object that include all JSON schema types. The code for it can be found [here](https://github.com/visionsofparadise/minibit/src/benchmark.test.ts).

| Serializer   | Size        |
|--------------|-------------|
| minibit      | 87 bytes    |
| msgpack      | 232 bytes   |
| JSON         | 306 bytes   |

## License

MIT