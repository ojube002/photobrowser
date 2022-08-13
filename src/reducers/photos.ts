export interface IPhoto {
    albumId: number,
    id: number,
    title: string,
    thumbnailUrl: string,
    url: string,
}

export interface IPhotosState {
    photos: IPhoto[],
    isFetched: boolean,
    loading: boolean,
    availableAlbumIds: number[]
}

const initialState: IPhotosState = {
    photos: [],
    isFetched: false,
    loading: true,
    availableAlbumIds: []
}

const photos = (state = initialState, action: any) => {
    switch (action.type) {
        case 'ADD_PHOTOS':
            return {
                isFetched: true,
                loading: false,
                photos: action.photos,
                availableAlbumIds: Array.from(new Set(action.photos.map((photo: IPhoto) => photo.albumId)))
            }
        default:
            return state
    }
}

export default photos;
