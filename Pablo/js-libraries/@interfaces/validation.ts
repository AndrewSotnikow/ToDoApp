import { Meta, ExpectedValue } from '#libraries/@interfaces';

export type ValidationResult = {
  isValid: boolean;
  reasons: Set<string>;
};

export type Validator = ((
  value: ExpectedValue,
  meta?: Meta,
) => Promise<ValidationResult>);

export type Validate = (types: ('change' | 'blur' | 'finish' | 'focus')[]) => Promise<ValidationResult>;
