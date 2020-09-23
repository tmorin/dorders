export const isBrowser: boolean = (
  // @ts-ignore
  typeof window === 'object' || typeof self === 'object'
);
const fs = isBrowser ? null : eval('require("fs")');
const rimraf = isBrowser ? null : eval('require("rimraf")');

export function createDirectory(path: string): string {
  if (fs) {
    fs.mkdirSync(path, {
      recursive: true
    });
  }
  return path;
}

export function deleteDirectory(path: string): string {
  if (rimraf) {
    rimraf.sync(path);
  }
  return path;
}
