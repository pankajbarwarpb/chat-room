import { Request, Response } from "express";
import { container } from "../di/container";
import { AuthService } from "../services/auth.service";

export const signUpHandler = async (req: Request, res: Response) => {
  const { username, password, name } = req.body;
  try {
    const authService = container.resolve(AuthService);
    const user = await authService.signUp(username, password, name);
    res.status(201).json({ message: "User created", user });
  } catch (e) {
    const error = e as Error;
    res.status(400).json({ error: error.message });
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const authService = container.resolve(AuthService);
    const result = await authService.login(username, password);
    res.json(result);
  } catch (e) {
    const error = e as Error;
    res.status(401).json({ error: error.message });
  }
};
