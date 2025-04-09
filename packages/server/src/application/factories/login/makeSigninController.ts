import { SignInController } from "../../controllers/login/SignInController";
import { makeSigninUseCase } from "./makeSigninUseCase";

export function makeSigninController(){
  return new SignInController(makeSigninUseCase());
}