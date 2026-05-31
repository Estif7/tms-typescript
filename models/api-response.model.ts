import { Temporal } from "@js-temporal/polyfill";

export type ApiResponse<T> =
  | { readonly status: "loading" }
  | { readonly status: "success"; readonly data: T; readonly fetchedAt: Temporal.Instant }
  | { readonly status: "error"; readonly message: string; readonly statusCode: number };


export function renderResponse<T>(
  response: ApiResponse<T>,
  formatter: (data: T) => string
): string {
  switch (response.status) {
    case "loading":
      return "Loading...";
    case "success":
      // Because we are inside the success branch, response.data is safely narrowed to T!
      return formatter(response.data);
    case "error":
      return `Error [${response.statusCode}]: ${response.message}`;
    default: {
      const _exhaustiveCheck: never = response;
      throw new Error(`Unhandled API response state: ${JSON.stringify(_exhaustiveCheck)}`);
    }
  }
}