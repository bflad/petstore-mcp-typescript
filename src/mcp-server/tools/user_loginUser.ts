/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { user_loginUser } from "../../funcs/user_loginUser.js";
import { LoginUserRequest$zodSchema } from "../../models/operations/loginuser.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: LoginUserRequest$zodSchema.optional(),
};

export const tool$user_loginUser: ToolDefinition<typeof args> = {
  name: "user-login-user",
  description: `Logs user into the system`,
  args,
  tool: async (client, args, ctx) => {
    const [result, apiCall] = await user_loginUser(
      client,
      args.request,
      { fetchOptions: { signal: ctx.signal } },
    ).$inspect();

    if (!result.ok) {
      return {
        content: [{ type: "text", text: result.error.message }],
        isError: true,
      };
    }

    const value = result.value;

    return formatResult(value, apiCall);
  },
};
