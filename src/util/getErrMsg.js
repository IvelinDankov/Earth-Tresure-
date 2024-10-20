export function getErrorMessage(err) {
  switch (err.name) {
    case "ValidationError":
      return Object.values(err.errors).at(0);

    default:
      return err.message;
  }
}
