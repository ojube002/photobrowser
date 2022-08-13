import { IPhoto } from 'reducers/photos';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface IGalleryImage {
    photo: IPhoto
}

const GalleryImg = styled.img`

`

function GalleryImage({ photo }: IGalleryImage) {
    const { id, title, url, thumbnailUrl } = photo;
    return (
        <div className='image-container'>
            <Link to={`/photo/${id}`}>
                <GalleryImg src={thumbnailUrl} alt={title} />
            </Link>
        </div>
    )
}

export default GalleryImage;