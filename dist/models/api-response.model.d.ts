import { Temporal } from "@js-temporal/polyfill";
export type ApiResponse<T> = {
    readonly status: "loading";
} | {
    readonly status: "success";
    readonly data: T;
    readonly fetchedAt: Temporal.Instant;
} | {
    readonly status: "error";
    readonly message: string;
    readonly statusCode: number;
};
export declare function renderResponse<T>(response: ApiResponse<T>, formatter: (data: T) => string): string;
//# sourceMappingURL=api-response.model.d.ts.map