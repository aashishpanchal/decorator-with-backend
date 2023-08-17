export const formatPlugin = (schema: any) => {
  schema.options.toJSON = {
    virtuals: true,
    versionKey: false,
    transform(doc, ret) {
      const id = ret._id;
      delete ret._id;

      return {
        id,
        ...ret,
      };
    },
  };
};
