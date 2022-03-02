import { parseFile, writeToPath, writeToStream } from "fast-csv";
import {
    DEFAULT_CSV_FORMATTER_OPTIONS,
    DEFAULT_CSV_READER_OPTIONS,
} from "./defaults";

import * as fs from 'fs';

export async function readCsv(
    fileName: string,
    options = DEFAULT_CSV_READER_OPTIONS
): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
        const data = [];
        parseFile(fileName, options)
            .on("error", (error) => reject(error))
            .on("data", (row) => data.push(row))
            .on("end", () => {
                resolve(data);
            });
    });
}

export async function writeCsv(
    fileName: string,
    data: any[],
    options = DEFAULT_CSV_FORMATTER_OPTIONS
) {
    return new Promise<void>((resolve, reject) => {

        const stream = fs.createWriteStream("out.csv",{flags: 'a'});
        writeToStream(stream, data, {
    includeEndRowDelimiter: true,

        })
                .on('error', (err: Error) => reject(err))
                .on('finish', () => resolve());
    });
}
