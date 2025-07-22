import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  username!: string;

  @Property()
  password!: string;

  @Property()
  name!: string;

  @Property({ type: "date", default: "now()" })
  createdAt?: Date = new Date();
}
