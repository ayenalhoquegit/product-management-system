import Iresponse from "../models/response.interface";
import { Constants } from "./constants.utils";

export class ResponseUtils {
  static insertRespose(): Iresponse {
    return {
      status: true,
      message: Constants.INSERT_MESSAGE,
    };
  }

  static updateRespose(): Iresponse {
    return {
      status: true,
      message: Constants.UPDATE_MESSAGE,
    };
  }

  static deleteRespose(): Iresponse {
    return {
      status: true,
      message: Constants.DELETE_MESSAGE,
    };
  }
}
