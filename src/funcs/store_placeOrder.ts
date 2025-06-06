/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { PetstoreCore } from "../core.js";
import { encodeJSON } from "../lib/encodings.js";
import * as M from "../lib/matchers.js";
import { compactMap } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { RequestOptions } from "../lib/sdks.js";
import { extractSecurity, resolveGlobalSecurity } from "../lib/security.js";
import { pathToFunc } from "../lib/url.js";
import { Order, Order$zodSchema } from "../models/components/order.js";
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
  PlaceOrderResponse,
  PlaceOrderResponse$zodSchema,
} from "../models/operations/placeorder.js";
import { APICall, APIPromise } from "../types/async.js";
import { Result } from "../types/fp.js";

/**
 * Place an order for a pet
 *
 * @remarks
 * Place a new order in the store
 */
export function store_placeOrder(
  client$: PetstoreCore,
  request?: Order | undefined,
  options?: RequestOptions,
): APIPromise<
  Result<
    PlaceOrderResponse,
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
    request,
    options,
  ));
}

async function $do(
  client$: PetstoreCore,
  request?: Order | undefined,
  options?: RequestOptions,
): Promise<
  [
    Result<
      PlaceOrderResponse,
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
  const parsed$ = safeParse(
    request,
    (value$) => Order$zodSchema.optional().parse(value$),
    "Input validation failed",
  );
  if (!parsed$.ok) {
    return [parsed$, { status: "invalid" }];
  }
  const payload$ = parsed$.value;
  const body$ = payload$ === undefined
    ? null
    : encodeJSON("body", payload$, { explode: true });
  const path$ = pathToFunc("/store/order")();

  const headers$ = new Headers(compactMap({
    "Content-Type": "application/json",
    Accept: "application/json",
  }));
  const securityInput = await extractSecurity(client$._options.security);
  const requestSecurity = resolveGlobalSecurity(securityInput);

  const context = {
    baseURL: options?.serverURL ?? client$._baseURL ?? "",
    operationID: "placeOrder",
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
    method: "POST",
    baseURL: options?.serverURL,
    path: path$,
    headers: headers$,
    body: body$,
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
    PlaceOrderResponse,
    | APIError
    | SDKValidationError
    | UnexpectedClientError
    | InvalidRequestError
    | RequestAbortedError
    | RequestTimeoutError
    | ConnectionError
  >(
    M.json(200, PlaceOrderResponse$zodSchema, { key: "Order" }),
    M.json(401, PlaceOrderResponse$zodSchema, { key: "ApiErrorUnauthorized" }),
    M.json(404, PlaceOrderResponse$zodSchema, { key: "ApiErrorNotFound" }),
    M.nil(405, PlaceOrderResponse$zodSchema),
  )(response, req$, { extraFields: responseFields$ });

  return [result$, { status: "complete", request: req$, response }];
}
