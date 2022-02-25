import { Row } from "@fast-csv/format";
import { FormatterOptionsArgs, ParserOptionsArgs } from "fast-csv";

export const DEFAULT_CSV_READER_OPTIONS: ParserOptionsArgs = {
    headers: true,
    trim: true,
};

export const DEFAULT_CSV_FORMATTER_OPTIONS: FormatterOptionsArgs<any, Row> = {
    headers: true,
    includeEndRowDelimiter: true,
};
