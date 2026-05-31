import { Temporal } from "@js-temporal/polyfill";
export function renderResponse(response, formatter) {
    switch (response.status) {
        case "loading":
            return "Loading...";
        case "success":
            // Because we are inside the success branch, response.data is safely narrowed to T!
            return formatter(response.data);
        case "error":
            return `Error [${response.statusCode}]: ${response.message}`;
        default: {
            const _exhaustiveCheck = response;
            throw new Error(`Unhandled API response state: ${JSON.stringify(_exhaustiveCheck)}`);
        }
    }
}
//# sourceMappingURL=api-response.model.js.map