import { SignUpController } from "../../controllers/login/SignUpController";
import { makeSignUpUseCase } from "./makeSignUpUseCase copy";

export function makeSignUpController() {
   return new SignUpController(makeSignUpUseCase());
}
