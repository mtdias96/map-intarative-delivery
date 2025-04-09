import { SigninUseCase } from "../../useCases/login/SigninUseCase";

export function makeSigninUseCase() {
  return new SigninUseCase();
}

