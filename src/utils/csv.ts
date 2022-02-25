import { parseFile, writeToPath } from "fast-csv";
import {
    DEFAULT_CSV_FORMATTER_OPTIONS,
    DEFAULT_CSV_READER_OPTIONS,
} from "./defaults";

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
        writeToPath(fileName, data, options)
            .on("error", (error) => reject(error))
            .on("finish", () => resolve());
    });
}
