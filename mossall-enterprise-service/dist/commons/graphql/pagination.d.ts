type ClassType<T = any> = new (...args: any[]) => T;
export declare class PaginationInfo {
    totalItems: number;
    pageCount: number;
    currentPage: number;
    pageSize: number;
}
export declare function PaginatedResult<TItem>(TItemClass: ClassType<TItem>): any;
export interface IPagination<T> {
    results: T[];
    pagination: any;
}
export {};
