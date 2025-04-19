import { ExecutionContext } from "@nestjs/common";
import { QueryDataConfigInput } from "./graphql/query-data-config.input";
export declare function getRequestFromContext(context: ExecutionContext): any;
export declare function normalizeQueryDataConfig(queryDataConfig: QueryDataConfigInput): QueryDataConfigInput;
export declare function generatePassword(length?: number, options?: {
    numbers: boolean;
    uppercase: boolean;
    symbols: boolean;
}): string;
