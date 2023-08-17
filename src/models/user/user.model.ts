import { Role } from "../role.enum";
import { hash, compare } from "bcrypt";
import {
  pre,
  prop,
  plugin,
  DocumentType,
  modelOptions,
  getModelForClass,
} from "@typegoose/typegoose";
import { formatPlugin } from "@models/plugins";

// middleware decorator
@pre<User>("save", async function (next) {
  if (this.password) {
    if (!this?.isModified("password")) return next();
    const hashedPassword = await hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
})
@plugin(formatPlugin)
@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  @prop({ unique: true, required: true })
  username: string;

  @prop()
  phone: string;

  @prop()
  email: string;

  @prop()
  firstName?: string;

  @prop()
  lastName?: string;

  @prop({ select: false, required: true })
  password: string;

  @prop({ type: String, enum: Role, default: Role.USER })
  role?: Role;

  @prop({ default: true })
  isActive?: boolean;

  @prop({ default: false })
  isPhoneVerify?: boolean;

  @prop({ default: false })
  isEmailVerify?: boolean;

  @prop()
  profile_img: string;

  @prop()
  lastLogin?: Date;

  async checkPassword(password: string) {
    if (this.password) {
      return await compare(password, this.password);
    }
    return false;
  }

  get fullName() {
    const fullName = `${this.firstName || ""} ${this.lastName || ""}`;
    return fullName.trim();
  }

  async updateLastLogin(this: UserDocument) {
    this.lastLogin = new Date();
    // update user last login
    return await this.save();
  }
}

export const UserModel = getModelForClass(User);

export type UserDocument = DocumentType<User>;
