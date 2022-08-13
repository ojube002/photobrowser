import React from 'react';
import styled from 'styled-components';
import PhotoGallery from 'components/PhotoGallery';

const Container = styled.div`
  margin: auto;
  max-width: 1340px;
  padding-top: 70px;
  padding-bottom: 50px;
`

const Title = styled.h1`
  font-size: 5rem;
  text-align: center;
  color: #565578;
  text-shadow: #eee 3px 3px 3px;
  margin-bottom: 100px;

  @media screen and (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 50px;
}
`

function App() {
  return (
    <Container>
      <Title>Photobrowser</Title>

      <PhotoGallery />

    </Container>
  );
}

export default App;
