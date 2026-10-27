export function formatValidationErrors(errors: readonly unknown[]): string {
  return errors
    .map((error) => {
      if (typeof error === "string") return error;
      if (error instanceof Error) return error.message;

      if (error && typeof error === "object" && "message" in error) {
        const message = error.message;
        if (typeof message === "string") return message;
      }

      return "";
    })
    .filter(Boolean)
    .join(", ");
}
