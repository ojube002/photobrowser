import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { IReducerRoot } from "reducers";
import { addPhotos } from 'actions';
import Loader from "components/Loader";
import { useParams, Link } from 'react-router-dom';
import { IPhoto } from 'reducers/photos';
import { Button } from 'components/StyledComponents';

const ErrorText = styled.p`
    text-align: center;
    color: red;
`

const Container = styled.div`
  margin: auto;
  max-width: 1340px;
  padding-top: 70px;
  padding-bottom: 30px;
`

const Title = styled.h1`
  color: #565578;
  margin: 0;
  margin-bottom: 20px;
  @media screen and (max-width: 768px) {
    font-size: 3rem;
}
`


function PhotoDetail() {
  const { isFetched, loading, photos } = useSelector((state: IReducerRoot) => state.photos);
  const dispatch = useDispatch();
  const params = useParams();

  const [error, setError] = useState<string>("");
  const [photo, setPhoto] = useState<IPhoto>();

  // Fetch photos if they are not fetched already
  useEffect(() => {
    if (isFetched) return;

    const controller = new AbortController();
    const signal = controller.signal;

    fetch('http://jsonplaceholder.typicode.com/photos', { signal })
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
  }, [isFetched]);

  // Find photo from photos and set to state
  useEffect(() => {
    if (loading) return;

    const photo = photos.find(photo => photo.id === Number(params.photoId));
    if (photo) {
      setPhoto(photo)
    } else {
      setError(`Could not find photo with id: ${params.photoId}`)
    }
  }, [loading, photos, params.photoId])

  if (error) {
    return (
      <Container>
        <ErrorText>{error}</ErrorText>
      </Container>
    )
  }

  return (
    <Container>
      {loading && <Loader text='Loading photo' />}

      {!loading && photo &&
        <>
          <div>
            <Link to="/">
              <Button>Go back to gallery</Button>
            </Link>
          </div>
          <div className="d-flex">
            <img src={photo.url} />
            <div className='ml'>
              <Title>{photo.title}</Title>
              <hr />
              <p>AlbumId: {photo.albumId}</p>
              <p>Id: {photo.id}</p>
              <p>Thumbnail url: {photo.thumbnailUrl}</p>
              <p>Url: {photo.url}</p>
            </div>
          </div>
        </>
      }
    </Container>
  );
}

export default PhotoDetail;
