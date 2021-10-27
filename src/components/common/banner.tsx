import React, { Component } from 'react';
import { Flex } from '@components/common/misc';
import { Label } from '@components/common/typography';
import styled, { keyframes } from 'styled-components';
import { inject, observer } from 'mobx-react';
import { IMessageStore } from '@stores/messages';
import { RouteComponentProps } from 'react-router';
import {Button} from 'antd';

const breatheAnimation = keyframes`
 0% {  height:120px; width: 100%; transform: translate(0,-20px); }
 50% {  width: 100%; transform:translate(0,20px); }
 100% {margin-top:0px; height:120px; width: 100%; transform: translate(0,0px); }
`

type animate = {
  move?: boolean;
}
export const Container = styled.div<animate>`
display: flex;
align-items: center;
width: 100%;
background-color: #FFF8E4;
height: 120px; 
padding: 20px;
flex-direction: column;
animation-name: ${props => (props.move ? breatheAnimation : null)};
 animation-duration: 1s;
 animation-iteration-count: 1;
`

@inject(
  'messagesStore'
)

@observer
class Banner extends Component<{messagesStore?:IMessageStore}> {
  

  public render() { 
    const { messagesStore } = this.props;
    return (
    <Container move={messagesStore!.isAnimating} onAnimationEnd={() => { messagesStore!.setIsAnimating(false) }}>
              <Label color="#FF0000">
                We highly recommend signing up for RudderStack Cloud to get access to features such as Transformations, Live Events, Warehouse Syncs, and more.
            </Label>
              <Flex style={{ paddingTop: '20px' }}>
                <Button type="primary" shape="round" href="https://app.rudderstack.com"> Try Now </Button>
              </Flex>
            </Container>

    );
}
}

export default Banner;