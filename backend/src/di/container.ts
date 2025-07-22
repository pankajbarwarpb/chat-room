import { container } from "tsyringe";
import { AuthService } from "../services/auth.service";
import { MikroORM } from "@mikro-orm/core";
import mikroConfig from "../infra/db/mikro-orm.config";

(async () => {
  const orm = await MikroORM.init(mikroConfig);
  const em = orm.em.fork();
  container.register(AuthService, { useFactory: () => new AuthService(em) });
})();

export { container };
