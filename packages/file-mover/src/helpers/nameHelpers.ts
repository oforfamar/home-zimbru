import { pipeline, Readable, Transform, Writable } from "node:stream";
import { promisify } from "node:util";
import type { File } from "../types/file.js";
import {
  removeProviderPrefixTransformer,
  removeResolutionSuffixTransformer,
  convertToObjectTransformer,
} from "./transformers/index.js";

const pipelinePromise = promisify(pipeline);

export async function getTransformedName(file: string): Promise<string> {
  let finalName = "";

  const removeProviderPrefix = new Transform({
    transform: removeProviderPrefixTransformer,
  });

  const removeResolutionSuffix = new Transform({
    transform: removeResolutionSuffixTransformer,
  });

  const convertToObject = new Transform({
    transform: convertToObjectTransformer,
  });

  const saveFullnameToVariable = new Writable({
    write(chunk: Buffer, _, callback): void {
      const {
        basePath,
        showName,
        season,
        file: { name, episode, extension, season: fileSeason },
      } = JSON.parse(chunk.toString()) as File;
      finalName = [
        basePath,
        showName,
        season,
        `${name} - s${fileSeason as string}e${episode}.${extension}`,
      ].join("/");
      callback();
    },
  });

  await pipelinePromise(
    Readable.from(file),
    removeProviderPrefix,
    removeResolutionSuffix,
    convertToObject,
    saveFullnameToVariable,
  );

  return finalName;
}
