import {Text} from 'schema-dts';

export function valueAsString(value?: Text | readonly Text[]): string | undefined {
  if (!value) {
    return;
  }
  if (typeof value === 'string') {
    return value;
  }
  return value[0];
}
