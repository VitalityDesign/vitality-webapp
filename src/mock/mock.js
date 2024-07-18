import {setupWorker} from "msw/browser";
import {defaultHandlers, handlers} from "@/mock/handlers.js";

const worker = setupWorker(...handlers, ...defaultHandlers);
await worker.start({
    onUnhandledRequest: "bypass",
});
