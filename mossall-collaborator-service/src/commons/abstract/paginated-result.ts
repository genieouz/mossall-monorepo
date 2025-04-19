import { PaginationInfo } from "../graphql/pagination";

export class IPaginatedResult<T> {
    results: T[];
    pagination: PaginationInfo;
}
