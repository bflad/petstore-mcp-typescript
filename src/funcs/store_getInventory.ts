/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { PetstoreCore } from "../core.js";
import * as M from "../lib/matchers.js";
import { compactMap } from "../lib/primitives.js";
import { RequestOptions } from "../lib/sdks.js";
import { extractSecurity, resolveGlobalSecurity } from "../lib/security.js";
import { pathToFunc } from "../lib/url.js";
import { APIError } from "../models/errors/apierror.js";
import {
  ConnectionError,
  InvalidRequestError,
  RequestAbortedError,
  RequestTimeoutError,
  UnexpectedClientError,
} from "../models/errors/httpclienterrors.js";
import { SDKValidationError } from "../models/errors/sdkvalidationerror.js";
import {
  GetInventoryResponse,
  GetInventoryResponse$zodSchema,
} from "../models/operations/getinventory.js";
import { APICall, APIPromise } from "../types/async.js";
import { Result } from "../types/fp.js";

/**
 * Returns pet inventories by status
 *
 * @remarks
 * Returns a map of status codes to quantities
 */
export function store_getInventory(
  client$: PetstoreCore,
  options?: RequestOptions,
): APIPromise<
  Result<
    GetInventoryResponse,
    | APIError
    | SDKValidationError
    | UnexpectedClientError
    | InvalidRequestError
    | RequestAbortedError
    | RequestTimeoutError
    | ConnectionError
  >
> {
  return new APIPromise($do(
    client$,
    options,
  ));
}

async function $do(
  client$: PetstoreCore,
  options?: RequestOptions,
): Promise<
  [
    Result<
      GetInventoryResponse,
      | APIError
      | SDKValidationError
      | UnexpectedClientError
      | InvalidRequestError
      | RequestAbortedError
      | RequestTimeoutError
      | ConnectionError
    >,
    APICall,
  ]
> {
  const path$ = pathToFunc("/store/inventory")();

  const headers$ = new Headers(compactMap({
    Accept: "application/json",
  }));
  const securityInput = await extractSecurity(client$._options.security);
  const requestSecurity = resolveGlobalSecurity(securityInput);

  const context = {
    baseURL: options?.serverURL ?? client$._baseURL ?? "",
    operationID: "getInventory",
    oAuth2Scopes: [],
    resolvedSecurity: requestSecurity,
    securitySource: client$._options.security,
    retryConfig: options?.retries
      || client$._options.retryConfig
      || { strategy: "none" },
    retryCodes: options?.retryCodes || [
      "429",
      "500",
      "502",
      "503",
      "504",
    ],
  };

  const requestRes = client$._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path: path$,
    headers: headers$,
    timeoutMs: options?.timeoutMs || client$._options.timeoutMs
      || -1,
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req$ = requestRes.value;

  const doResult = await client$._do(req$, {
    context,
    errorCodes: [],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes,
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req$ }];
  }
  const response = doResult.value;
  const responseFields$ = {
    HttpMeta: { Response: response, Request: req$ },
  };

  const [result$] = await M.match<
    GetInventoryResponse,
    | APIError
    | SDKValidationError
    | UnexpectedClientError
    | InvalidRequestError
    | RequestAbortedError
    | RequestTimeoutError
    | ConnectionError
  >(
    M.json(200, GetInventoryResponse$zodSchema, { key: "object" }),
    M.json(401, GetInventoryResponse$zodSchema, {
      key: "ApiErrorUnauthorized",
    }),
    M.json(404, GetInventoryResponse$zodSchema, { key: "ApiErrorNotFound" }),
  )(response, req$, { extraFields: responseFields$ });

  return [result$, { status: "complete", request: req$, response }];
}
