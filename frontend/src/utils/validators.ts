export interface Validator {
    validate(value: string, formData?: { [key: string]: string | number}): string | null;
  }
  
  export class RequiredValidator implements Validator {
    validate(value: string): string | null {
      return value.trim() ? null : 'This field is required.';
    }
  }
  
  export class MinLengthValidator implements Validator {
    constructor(private minLength: number) {}
    validate(value: string): string | null {
      return value.length >= this.minLength
        ? null
        : `Must be at least ${this.minLength} characters long.`;
    }
  }
  
  export class EmailValidator implements Validator {
    validate(value: string): string | null {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? null : 'Invalid email address.';
    }
  }
  
  export class MatchValidator implements Validator {
    constructor(private matchField: string) {}
    validate(value: string, formData: { [key: string]: string|number }): string | null {
      return value === formData[this.matchField]
        ? null
        : `Must match ${this.matchField}.`;
    }
  }
  export class PasswordStrengthValidator implements Validator {
    constructor(private minScore: number) {}
    validate(value: string, formData?: { [key: string]: string|number }): string | null {
      // Assume the `passwordScore` is passed as part of `formData`
      const score = formData?.passwordScore;
      return typeof score === 'number' && score >= this.minScore
              ? null
        : `Password strength must be at least ${this.minScore}.`;
    }
  }
  