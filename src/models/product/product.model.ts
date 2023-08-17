import {
  Ref,
  prop,
  modelOptions,
  getModelForClass,
} from "@typegoose/typegoose";
import { Brand } from "./brand.model";
import { User } from "../user/user.model";
import { Category } from "./category.model";

@modelOptions({ schemaOptions: { timestamps: true } })
class Product {
  @prop({ ref: () => User })
  user: Ref<User>;

  @prop({ ref: () => Category })
  category: Ref<Category>;

  @prop({ ref: () => Brand })
  brand: Ref<Brand>;

  @prop()
  title: string;
}

export const ProductModel = getModelForClass(Product);
