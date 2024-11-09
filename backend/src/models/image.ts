import mongoose, { Schema, Document, model, Types} from "mongoose";

export interface IImage extends Document{
    URL: string;
    categoryID: Types.ObjectId;
    createdAt: Date;
}

const imageSchema = new Schema<IImage> ({
    URL: {type: String, required:true, unique:true},
    categoryID: {
        type: Schema.Types.ObjectId,
        required: [true, 'Category is required'],
        ref: 'Category',
        validate: {
          validator: function (value: Types.ObjectId) {
            // Ensure the category is a valid ObjectId
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: 'Category must be a valid ObjectId',
        },
      },
    createdAt: { type: Date, default: Date.now, required: true}
})

export const Image = model<IImage>('Image', imageSchema);