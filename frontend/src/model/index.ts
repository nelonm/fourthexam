import { z } from "zod";

export const QuerySchema = z.union([
  z.object({ min: z.coerce.number(), max: z.coerce.number() }),
  z.object({ includes: z.string() }),
]);

export const HotelSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    pricePerNightInUSD: z.number(),
  })
  .array();
