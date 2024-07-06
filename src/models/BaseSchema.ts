import { Schema, SchemaDefinition } from 'mongoose';

class BasicSchema extends Schema {
  constructor(fields: SchemaDefinition) {
    const defaultFields: SchemaDefinition = {
      createdAt: { type: Date, default: Date.now },
      disabled: { type: Boolean, default: false, select: false },
      updatedAt: { type: Date, default: Date.now },
    };

    const extendedFields = Object.assign({}, fields, defaultFields);

    super(extendedFields, { id: false, timestamps: true });

    const schema = this;

    schema.set('toJSON', { virtuals: true });
  }
}

export default BasicSchema;
