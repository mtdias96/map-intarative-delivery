import { AuthenticationMiddleware } from "../../middlewares/AuthenticationMiddleware";

export function makeAuthenticateMiddleware(){
  return new AuthenticationMiddleware()
}