import { number, z } from "zod"
import { safeFetch } from "../lib/safeFetch"
import { QuerySchema, HotelSchema } from "../model"

type Prices = {
  min: number;
  max: number;
}

export const getHotels = (prices:Prices) =>
    safeFetch({
      method: "GET",
      url: `/api/hotels`,
      schema: HotelSchema,
    });

    export const getHotelsByName = (name:string) =>
      safeFetch({
        method: "GET",
        url: `/api/hotels`,
        schema: HotelSchema
      });