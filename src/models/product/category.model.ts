import { User } from "../user/user.model";
import {
  Ref,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: true } })
export class Category {
  @prop({ ref: () => Category })
  parent: Ref<Category>;

  @prop({ ref: () => User })
  user: Ref<User>;

  @prop()
  name: string;

  @prop({ required: true, unique: true })
  slug: string;

  @prop({ required: true })
  img: string;
}

export const CategoryModel = getModelForClass(Category);
