import { IImage } from './image';

export class NullImage implements Partial<IImage> {
    _id: any;
    URL = "https://example.com/default-image.png"; // Default URL for the null image
    createdAt: Date = new Date();

    constructor() {
        this._id = null;
    }
}
