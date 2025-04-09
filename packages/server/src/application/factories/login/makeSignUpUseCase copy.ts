import { SignUpUseCase } from "../../useCases/login/SignUpUseCase";

export function makeSignUpUseCase() {
   return new SignUpUseCase();
}
