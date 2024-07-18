# bit-pack

Compression and decompression of data described by JSON Schema.

```
npm install bit-pack
```

Bit-pack allows you to reuse validation JSON Schema to compress data to a smaller size than JSON serialization.

Typically, you can compress data to as little as 30% the size of arbitrary serialization such as JSON stringification and message pack.

This is achieved by:
- Prioritizing minimal bit information over byte alignment.
- Encoding content encoded strings and formats as bytes.
- Compacting integer values used for lengths and counts down to exact bit depths based on expected ranges.
- Storing references to const, enum and null values instead of actual values.

## Usage

```js
import { BitPack } from 'bit-pack';

const data = {
   // data
};

const schema = {
   // JSON Schema
};

// Load schemas and referenced schemas
const bitPack = new BitPack([schema])

const buffer = bitPack.encode(data, schema['$id'])

const dataB = bitPack.decode(buffer, schema['$id'])
```

## API

### Constructor

#### `bitPack = new BitPack(schema, [...referencedSchemas])`

Create a new bitPack instance.

### Instance Methods

#### `buffer = bitPack.encode(data, schemaId)`

Encodes data to buffer.

#### `data = bitPack.decode(buffer, schemaId)`

Decodes data from buffer.

## Backwards Compatibility

The following changes in schema break backwards compatibility for encoded data:
- Adding to object properties, enums, array prefix items anywhere other than at the end.
- Removing object properties, enums, array prefix items.
- Changing order of object properties, enums, array prefix items.
- Changing length/quantity properties such as minItems, maxItems, minLength, maxLength, minimum, maximum, etc.
- Changing string contentEncoding or format.

It is recommended to make the root schema an object, only add new properties and mark old properties as deprecated.

BitPack does not validate data and treats object properties as optional. Decoding will not fail if a deprecated properties is not present.

## Benchmarks

Benchmarks use a sample object that include all JSON schema types. The code for it can be found [here](https://github.com/visionsofparadise/bit-pack/src/benchmark.test.ts).

### Serialized Size
| bitPack                      | 87 bytes                                   |
| msgpack                      | 232 bytes                                  |
| JSON                         | 306 bytes                                  |

## License

MIT