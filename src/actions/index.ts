import { IPhoto } from 'reducers/photos';

export const addPhotos = (photos: IPhoto[]) => ({
    type: 'ADD_PHOTOS',
    photos: photos
})