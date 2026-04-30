import { z } from "zod";

class BaseDto {
  static schema: z.ZodObject;

  static validate(data: Record<string, any>): { data: Record<string, any> | null, error: z.ZodError | null } {
    const { success, data: parsedData, error } = this.schema.safeParse(data);

    if (!success) return { data: null, error };

    return { data: parsedData, error: null };
  }
};

export default BaseDto;
