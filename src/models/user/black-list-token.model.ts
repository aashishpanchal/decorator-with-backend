import {
  Ref,
  prop,
  plugin,
  modelOptions,
  getModelForClass,
} from "@typegoose/typegoose";
import { User } from "./user.model";
import { formatPlugin } from "../plugins";

@plugin(formatPlugin)
@modelOptions({ schemaOptions: { timestamps: true } })
export class BlacklistToken {
  @prop({ required: true, ref: () => User })
  user: Ref<User>;

  @prop()
  jti: string;

  @prop({ required: true })
  token: string;

  @prop({ default: false })
  isBlackListed: boolean;

  @prop()
  expiresAt: Date;
}

export const BlackListModel = getModelForClass(BlacklistToken);
