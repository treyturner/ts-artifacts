// This code was automatically generated from an OpenAPI description.
// Do not edit this file. Edit the OpenAPI file instead.
// For more information, see https://github.com/pmcelhaney/counterfact/blob/main/docs/faq-generated-code.md

import type { WideOperationArgument } from "../../../types.ts";
import type { OmitValueWhenNever } from "../../../types.ts";
import type { COUNTERFACT_RESPONSE } from "../../../types.ts";
import type { Context } from "../../../routes/_.context.ts";
import type { ResponseBuilderFactory } from "../../../types.ts";
import type { DataPage_TasksRewardFullSchema_ } from "../../components/schemas/DataPage_TasksRewardFullSchema_.js";

export type HTTP_GET = (
  $: OmitValueWhenNever<{
    query: { page?: number; size?: number };
    path: never;
    header: never;
    body: never;
    context: Context;
    response: ResponseBuilderFactory<{
      200: {
        headers: never;
        requiredHeaders: never;
        content: {
          "application/json": {
            schema: DataPage_TasksRewardFullSchema_;
          };
        };
      };
    }>;
    x: WideOperationArgument;
    proxy: (url: string) => COUNTERFACT_RESPONSE;
    user: { username?: string; password?: string };
  }>,
) =>
  | {
      status: 200;
      contentType?: "application/json";
      body?: DataPage_TasksRewardFullSchema_;
    }
  | { status: 415; contentType: "text/plain"; body: string }
  | COUNTERFACT_RESPONSE
  | { ALL_REMAINING_HEADERS_ARE_OPTIONAL: COUNTERFACT_RESPONSE };
