import { Schema, Document, model} from "mongoose";

export interface IImage extends Document{
    URL: string
}

const imageSchema = new Schema<IImage> ({
    URL: {type: String, required:true, unique:true}
})

export const Image = model<IImage>('Image', imageSchema);