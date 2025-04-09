import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { managers } from "../../../db/schema";
import { AccountsAlreadyExists } from "../../errors/login/AccountsAlreadyExists";

interface IInput {
  name: string;
  email: string;
  password: string;
}

type IOutput = void;

export class SignUpUseCase {
  async execute(input: IInput): Promise<IOutput> {
    const { name, email, password } = input;

    const existingManager = await db
      .select()
      .from(managers)
      .where(eq(managers.email, email))
      .limit(1);

    if (existingManager[0]) {
      throw new AccountsAlreadyExists();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db
      .insert(managers)
      .values({ name, email, password: hashedPassword })
      .returning();
  }
}
