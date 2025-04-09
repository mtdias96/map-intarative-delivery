import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import { sign } from "jsonwebtoken";
import { env } from "../../../config/env";
import { db } from "../../../db";
import { managers } from "../../../db/schema";
import { InvalidCredentials } from "../../errors/login/InvalidCredentials";

interface IInput {
  email: string;
  password: string;
}

interface IOutput {
  accessToken: string;
};

export class SigninUseCase {
  async execute(input: IInput): Promise<IOutput> {
    const {email, password } = input;

    const [account] = await db.select().from(managers).where(eq(managers.email, email)).limit(1);
    
    if (!account) {
      throw new InvalidCredentials();
    }

    const isPasswordValid = await compare(password, account.password);

    if (!isPasswordValid) {
      throw new InvalidCredentials();
    }

    const accessToken = sign({ sub: account.id }, env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return { accessToken };
  }
}