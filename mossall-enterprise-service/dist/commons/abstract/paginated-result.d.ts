import { PaginationInfo } from "../graphql/pagination";
export declare class IPaginatedResult<T> {
    results: T[];
    pagination: PaginationInfo;
}
