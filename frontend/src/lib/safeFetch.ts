import { z } from "zod";

type Response<Data> =
  | {
      success: true;
      status: number;
      data: Data;
    }
  | {
      success: false;
      status: number | null;
    };

type Method = "GET" | "POST" | "PATCH" | "DELETE";

const baseUrl = "http://localhost:3000";

export const safeFetch = async <Schema extends z.ZodTypeAny>(config: {
  method: Method;
  url: string;
  schema: Schema;
  payload?: any;
}): Promise<Response<z.infer<typeof config.schema>>> => {
  let response;
  const { method, url, schema, payload } = config;
  try {
    response = await fetch(baseUrl + url, {
      method,
      headers: payload
        ? {
            "Content-Type": "application/JSON",
          }
        : {},
      body: payload ? JSON.stringify(payload) : undefined,
    });

    if (response.status >= 500)
      return { success: false, status: response.status };

    if (response.status >= 400) {
      return { success: false, status: response.status };
    }

    const data = await response.json();

    const result = schema.safeParse(data);
    if (!result.success) {
      return { success: false, status: response.status };
    }

    return { data: result.data, success: true, status: response.status };
  } catch (error) {
    return { success: false, status: null };
  }
};
