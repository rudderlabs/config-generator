import styled from 'styled-components';

export const Heading = styled.div`
  padding: 50px 0px 50px 0px;
  text-align: start;
`;

export const BodyContainer = styled.div`
  flex-direction: row;
  display: flex;
  margin: 10px 0px 10px 0px;
  #sources-list {
    margin-right: 220px;
  }
  @media screen and (min-width: 200px) and (max-width: 1024px){
  overflow-x: scroll;
  width: 600px;
`;

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding: 0 15px 15px;
  margin-bottom: 100px
`;