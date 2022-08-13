import { combineReducers } from 'redux';
import photos, { IPhotosState } from './photos';

export interface IReducerRoot {
    photos: IPhotosState
}

export default combineReducers({
    photos
})
