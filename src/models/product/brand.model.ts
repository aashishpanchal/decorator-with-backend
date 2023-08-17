import { formatPlugin } from "../plugins";
import { User } from "../user/user.model";
import {
  Ref,
  prop,
  plugin,
  modelOptions,
  getModelForClass,
} from "@typegoose/typegoose";

@plugin(formatPlugin)
@modelOptions({ schemaOptions: { timestamps: true } })
export class Brand {
  @prop({ ref: () => User })
  user: Ref<User>;

  @prop()
  name: string;

  @prop({ required: true, unique: true })
  slug: string;

  @prop({ required: true })
  img: string;
}

export const BrandModel = getModelForClass(Brand);
