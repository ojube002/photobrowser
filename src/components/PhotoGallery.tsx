import { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { IReducerRoot } from "reducers";
import { addPhotos } from 'actions';
import Loader from "components/Loader";
import GalleryImage from './GalleryImage';
import { IPhoto } from 'reducers/photos';
import { Button, Row } from './StyledComponents';

const ErrorText = styled.p`
    text-align: center;
    color: red;
`

const GalleryImagesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    
    .image-container {
        margin: 10px;
        flex: 1 1 150px;
        max-width: 150px;
    }
    .image-container img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        vertical-align: middle;
        border-radius: 3px;
        box-shadow: 3px 3px 3px rgb(0 0 0 / 15%);
        
    }
`


function PhotoGallery() {
    const { isFetched, loading, photos, availableAlbumIds } = useSelector((state: IReducerRoot) => state.photos);
    const dispatch = useDispatch();

    const [error, setError] = useState("");
    const [albumIndex, setAlbumIndex] = useState<number>(0);

    const filteredPhotosByAlbumId = useMemo(() => {
        const filtered = photos.filter(photo => photo.albumId === availableAlbumIds[albumIndex]);
        return filtered;
    }, [photos, availableAlbumIds, albumIndex])


    useEffect(() => {
        if (isFetched) return;

        const controller = new AbortController();
        const signal = controller.signal;

        fetch('/api/photos', { signal })
            .then(response => response.json())
            .then(photos => {
                dispatch(addPhotos(photos))
            })
            .catch(err => {
                if (err.name === "AbortError") {
                    console.error("Fetch was cancelled")
                } else {
                    setError("An error occured, please try again!")
                }
            })

        return () => {
            controller.abort();
        }
    }, [isFetched, dispatch]);

    const previousAlbum = () => {
        if (albumIndex > 0) {
            setAlbumIndex(albumIndex - 1)
        }
    }

    const nextAlbum = () => {
        if (albumIndex < (availableAlbumIds.length - 1)) {
            setAlbumIndex(albumIndex + 1)
        }
    }

    if (error) {
        return <ErrorText>{error}</ErrorText>
    }

    if (loading) {
        return <Loader text='Loading photos' />
    }

    return (
        <>
            <div className="d-flex align-center justify-end mb-4">
                <div className='mr-auto'>AlbumID: {availableAlbumIds[albumIndex]}</div>
                <div className="d-flex mr-1">Check another photo album:</div>
                <Button disabled={albumIndex === 0} onClick={() => previousAlbum()} className='mb-0 mr-1'>Previous</Button>
                <Button disabled={albumIndex === (availableAlbumIds.length - 1)} onClick={() => nextAlbum()} className='mb-0'>Next</Button>
            </div>
            <Row>
                <GalleryImagesContainer>
                    {
                        filteredPhotosByAlbumId.length
                            ? filteredPhotosByAlbumId.map((photo: IPhoto) => {
                                return <GalleryImage key={photo.id} photo={photo} />
                            })
                            : <p>No photos!</p>
                    }
                </GalleryImagesContainer>
            </Row>
        </>
    );
}

export default PhotoGallery;
