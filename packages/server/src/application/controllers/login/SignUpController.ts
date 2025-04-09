import z, { ZodError } from "zod";
import { AccountsAlreadyExists } from "../../errors/login/AccountsAlreadyExists";
import type { IController, IRequest, IResponse } from "../../interfaces/IController";
import type { SignUpUseCase } from "../../useCases/login/SignUpUseCase";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email().min(1),
  password: z.string().min(8),
});

export class SignUpController implements IController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { name, email, password } = schema.parse(body);

      await this.signUpUseCase.execute({ name, email, password });

      return {
        statusCode: 201,
        body: null,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      if(error instanceof  AccountsAlreadyExists){
        return {
          statusCode: 409,
          body: {
            error: 'Account already exists',
          },
        };
      }
      throw error;
    }
  }
}