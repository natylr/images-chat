import { Schema, Document, model} from "mongoose";

export interface IImage extends Document{
    URL: string;
    createdAt: Date;
}

const imageSchema = new Schema<IImage> ({
    URL: {type: String, required:true, unique:true},
    createdAt: { type: Date, default: Date.now, required: true}
})

export const Image = model<IImage>('Image', imageSchema);