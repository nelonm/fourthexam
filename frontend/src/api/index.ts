import { number, z } from "zod"
import { safeFetch } from "../lib/safeFetch"
import { QuerySchema } from "../model"

type Prices = {
  min: number;
  max: number;
}

export const getHotels = (prices:Prices, type:string) =>
    safeFetch({
      method: "GET",
      url: `/api/hotels`,
      schema: z.string().array(),
    });