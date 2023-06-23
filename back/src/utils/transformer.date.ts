import { ValueTransformer } from "typeorm";

export const transformer: ValueTransformer | ValueTransformer[] = {
    to(value: Date | string | null): string {
        return value instanceof Date ? value.toISOString() : value;
    },
    from(value: string | null): Date {
        return value ? new Date(`${value}Z`) : null;
    },
}

