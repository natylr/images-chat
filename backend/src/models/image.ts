import { Schema, Document, model} from "mongoose";

export interface IImage extends Document{
    link: string
}

const imageSchema = new Schema<IImage> ({
    link: {type: String, required:true, unique:true}
})

export const Image = model<IImage>('Image', imageSchema);