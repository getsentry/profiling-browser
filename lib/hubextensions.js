"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addExtensionMethods = void 0;
const hub_1 = require("@sentry/hub");
const utils_1 = require("@sentry/utils");
// @ts-ignore
const cpu_profiler_1 = __importDefault(require("./../build/Release/cpu_profiler"));
function _wrapStartTransaction(startTransaction) {
    return function wrappedStartTransaction(transactionContext, customSamplingContext) {
        const transaction = startTransaction.call(this, transactionContext, customSamplingContext);
        const originalFinish = transaction.finish.bind(transaction);
        cpu_profiler_1.default.startProfiling(transactionContext.name);
        utils_1.logger.log('[Profiling] started profiling transaction: ' + transactionContext.name);
        function profilingWrappedTransactionFinish() {
            const profile = cpu_profiler_1.default.stopProfiling(transactionContext.name);
            utils_1.logger.log('[Profiling] stopped profiling of transaction: ' + transactionContext.name);
            // Metadata is strictly typed and profile is not a part of it.
            // Expect error for now and update the SDK later.
            // @ts-expect-error
            transaction.setMetadata({ profile });
            return originalFinish();
        }
        transaction.finish = profilingWrappedTransactionFinish;
        return transaction;
    };
}
/**
 * @private
 */
function _addProfilingExtensionMethods() {
    const carrier = (0, hub_1.getMainCarrier)();
    if (!carrier.__SENTRY__) {
        return;
    }
    carrier.__SENTRY__.extensions = carrier.__SENTRY__.extensions || {};
    if (carrier.__SENTRY__.extensions['startTransaction']) {
        carrier.__SENTRY__.extensions['startTransaction'] = _wrapStartTransaction(
        // This is patched by sentry/tracing, we are going to re-patch it...
        carrier.__SENTRY__.extensions['startTransaction']);
    }
}
/**
 * This patches the global object and injects the Profiling extensions methods
 */
function addExtensionMethods() {
    _addProfilingExtensionMethods();
}
exports.addExtensionMethods = addExtensionMethods;