// This code was automatically generated from an OpenAPI description.
// Do not edit this file. Edit the OpenAPI file instead.
// For more information, see https://github.com/pmcelhaney/counterfact/blob/main/docs/faq-generated-code.md

import type { WideOperationArgument } from "../../../../../../types.ts";
import type { OmitValueWhenNever } from "../../../../../../types.ts";
import type { COUNTERFACT_RESPONSE } from "../../../../../../types.ts";
import type { Context } from "../../../../../../routes/_.context.ts";
import type { ResponseBuilderFactory } from "../../../../../../types.ts";
import type { TaskResponseSchema } from "../../../../../components/schemas/TaskResponseSchema.js";

export type HTTP_POST = (
  $: OmitValueWhenNever<{
    query: never;
    path: { name: string };
    header: never;
    body: never;
    context: Context;
    response: ResponseBuilderFactory<{
      200: {
        headers: never;
        requiredHeaders: never;
        content: {
          "application/json": {
            schema: TaskResponseSchema;
          };
        };
      };
      486: {
        headers: never;
        requiredHeaders: never;
        content: never;
      };
      489: {
        headers: never;
        requiredHeaders: never;
        content: never;
      };
      498: {
        headers: never;
        requiredHeaders: never;
        content: never;
      };
      499: {
        headers: never;
        requiredHeaders: never;
        content: never;
      };
      598: {
        headers: never;
        requiredHeaders: never;
        content: never;
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
      body?: TaskResponseSchema;
    }
  | {
      status: 486;
    }
  | {
      status: 489;
    }
  | {
      status: 498;
    }
  | {
      status: 499;
    }
  | {
      status: 598;
    }
  | { status: 415; contentType: "text/plain"; body: string }
  | COUNTERFACT_RESPONSE
  | { ALL_REMAINING_HEADERS_ARE_OPTIONAL: COUNTERFACT_RESPONSE };
