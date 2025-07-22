import { EntityManager } from "@mikro-orm/core";
import { User } from "../infra/db/entities/User";
import { comparePassword, hashPassword } from "../utils/hash";
import { signToken } from "../utils/jwt";

export class AuthService {
  constructor(private readonly em: EntityManager) {}

  async signUp(username: string, password: string, name: string) {
    const existing = await this.em.findOne(User, { username });
    console.log({ existing });

    if (existing) throw new Error("User already exists");

    const hashed = await hashPassword(password);
    const user = this.em.create(User, { username, password: hashed, name });
    await this.em.persistAndFlush(user);
    return { name: user.name, username: user.username };
  }

  async login(username: string, password: string) {
    const user = await this.em.findOne(User, { username });
    if (!user || !(await comparePassword(password, user.password))) {
      throw new Error("Invalid Credentials");
    }

    const token = signToken({ userId: user.id });
    return { user: { name: user.name, username: user.username }, token };
  }
}
