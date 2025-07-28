import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "./User";

@Entity()
export class Message {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  from!: User;

  @Property()
  to!: User;

  @Property({ type: "date", default: "now()" })
  createdAt?: Date = new Date();
}
