import { plainToInstance } from "class-transformer"
import { validateSync} from "class-validator";

export const envValidate = <T extends object> (environment: new (...args: unknown[]) => T) => {
    return function(config: Record<string, unknown>){
      const validatedConfig = plainToInstance(
            environment,
            config,
            { enableImplicitConversion: true },
          );
          const errors = validateSync(validatedConfig, { skipMissingProperties: false });
        
          if (errors.length > 0) {
            throw new Error(errors.toString());
          }
          return validatedConfig;
    }
}

