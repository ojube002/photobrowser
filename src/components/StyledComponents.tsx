import styled from 'styled-components';

export const Button = styled.button`
  background-color: white;
  color: #565578;
  border: none;
  border-radius: 4px;
  margin-bottom: 25px;
  box-shadow: 3px 3px 3px rgba(0,0,0,5%);
  padding: 10px;
  font-weight: 600;
  &:hover {
    cursor: pointer;
    box-shadow: 3px 3px 3px rgba(0,0,0,10%);
  }

  &:disabled {
    background-color: #eee;
    color: #b1b1b1;
    box-shadow: 3px 3px 3px rgba(0,0,0,5%);
    cursor: auto
  }

`

export const Row = styled.div`
  margin-left: -10px;
  margin-right: -10px;
`