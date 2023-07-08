import { TransformCallback } from "node:stream";
import type { File } from "../../types/file.js";

// function calculateSubFolder(episode: number): string {
//   let check = 100;
//   while (check <= episode) {
//     check += 100;
//   }

//   return `${check - 99}-${check}`;
// }

function overwriteWithInfoFromDb(
  chunk: string | Buffer,
  _: BufferEncoding,
  callback: TransformCallback,
): void {
  const fileObj = JSON.parse(chunk.toString()) as File;

  callback(null, JSON.stringify(fileObj));

  // fileObj.basePath = row.basePath;
  // fileObj.showName = row.correctName || fileObj.showName;
  // fileObj.season = `Season ${row.season?.padStart(2, "0")}`;
  // fileObj.file.name = row.correctName || fileObj.showName;
  // fileObj.file.season = row.season?.padStart(2, "0");

  // if (row.isLongRunning) {
  //   fileObj.season = calculateSubFolder(Number(fileObj.file.episode));
  //   fileObj.file.season = "01";
  // }

  // callback(null, JSON.stringify(fileObj));
}

export default overwriteWithInfoFromDb;
