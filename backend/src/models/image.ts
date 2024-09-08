import { Schema, Document, model, Types} from "mongoose";

export interface IImage extends Document{
    URL: string;
    category: Types.ObjectId;
    createdAt: Date;
}

const imageSchema = new Schema<IImage> ({
    URL: {type: String, required:true, unique:true},
    category:{ type: Schema.Types.ObjectId, require:true, ref: 'Category' },
    createdAt: { type: Date, default: Date.now, required: true}
})

export const Image = model<IImage>('Image', imageSchema);