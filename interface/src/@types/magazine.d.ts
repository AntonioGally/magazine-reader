export interface IValidator {
    execute: () => {
        errorCause: string | undefined;
        error: boolean;
    };
}