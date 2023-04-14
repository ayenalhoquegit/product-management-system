export const Constants = {
  API: "api",
  API_VERSION_1: "v1",
  BAD_REQ: "Bad request",
  NOT_FOUND: "Not found",
  CONFLICT: "Already exists",
  UPDATE_FAILED: "Update failed",
  GENERIC_ERROR: "An error occurred",
  SERVER_ERROR: "Internal server error",
  INSERT_MESSAGE: "Data successfully inserted",
  UPDATE_MESSAGE: "Data successfully updated",
  DELETE_MESSAGE: "Data successfully deleted",
  HTTP_200: 200, // ok
  HTTP_201: 201, // created
  HTTP_204: 204, // No Content
  HTTP_400: 400, // bad req
  HTTP_401: 401, // Unauthorized
  HTTP_404: 404, // not found
  HTTP_409: 409, // conflict
  HTTP_500: 500, // internal server error
} as const;
