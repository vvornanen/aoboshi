import { createGunzip } from "zlib";
import { createReadStream } from "fs";

/**
 * Reads a gzip file and returns the extracted content as string.
 *
 * @param path gzip file path
 */
export const readGzip = (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const gunzip = createGunzip();
    const source = createReadStream(path);

    const pipe = source.pipe(gunzip);

    const chunks: Buffer[] = [];

    pipe.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    pipe.on("error", (error) => reject(error));
    pipe.on("end", () => {
      resolve(Buffer.concat(chunks).toString());
    });
  });
};
