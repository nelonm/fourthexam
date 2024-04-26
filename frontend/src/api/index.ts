import { z } from "zod"
import { safeFetch } from "../lib/safeFetch"
import { QuerySchema } from "../model"

export const getHotels = (min: number, max: number) =>
    safeFetch({
      method: "GET",
      url: `/api/hotels`,
      schema: QuerySchema,
    });