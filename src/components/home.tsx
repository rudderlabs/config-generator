import Connections from '@components/connections';
import DestinationDetails from '@components/destinationDetails';
import Destinations from '@components/destinations';
import Sidebar from '@components/sidebar';
import AddSource from '@components/source/addSource';
import ConnectSources from '@components/connectSources';
import SourceDetails from '@components/sourceDetails';
import Sources from '@components/sources';
import { IDestinationDefsListStore } from '@stores/destinationDefsList';
import { IDestinationsListStore } from '@stores/destinationsList';
import { ISourceDefinitionsListStore } from '@stores/sourceDefinitionsList';
import { ISourcesListStore } from '@stores/sourcesList';
import { Layout, Skeleton, Card, Button } from 'antd';
import { inject, observer } from 'mobx-react';
import React, { Component, useEffect, useState } from 'react';
import { Label } from '@components/common/typography';
import { message, Alert } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';

import AddDestination from './destination/addDestination';
import { IMessageStore, MessagesStore } from '@stores/messages';
import styled, { keyframes } from 'styled-components';
import { Flex } from './common/misc';
import { IConnectionsStore } from '../stores/connections';

interface IHomeProps extends RouteComponentProps {
  sourcesListStore: ISourcesListStore;
  destinationsListStore: IDestinationsListStore;
  connectionsStore: IConnectionsStore;
  sourceDefinitionsListStore: ISourceDefinitionsListStore;
  destinationDefsListStore: IDestinationDefsListStore;
  messagesStore: IMessageStore;
}

interface IRouterProps extends RouteComponentProps {
  messagesStore: MessagesStore;
}

const breatheAnimation = keyframes`
 0% {  height:120px; width: 100%; transform: translate(0,-20px); }
 50% {  width: 100%; transform:translate(0,20px); }
 100% {margin-top:0px; height:120px; width: 100%; transform: translate(0,0px); }
`
export const StyledNotification = styled.div`
  position: fixed;
  width: 45vw;
  left: 30vw;
  top: 0px;
`;

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

const RenderLayout = withRouter(({ history }) => {
  // useEffect(
  //   () =>
  //     history.listen((location, action) => {
  //       window.rudderanalytics.page('Page viewed', 'Page viewed', {
  //         path: location.pathname,
  //         referrer: '',
  //         search: '',
  //         title: '',
  //         url: window.location.href,
  //       });
  //     }),
  //   [],
  // );

  return (
    <Layout >
      <Switch>
        <Route path="/home" exact={true} component={Connections} />
        <Route path="/" exact={true} component={Connections} />
        <Route path="/sources" exact={true} component={Sources} />
        <Route path="/sources/setup" exact={true} component={AddSource} />
        <Route path="/sources/setup/:id" exact={true} component={AddSource} />
        <Route path="/sources/:id" exact={true} component={SourceDetails} />
        <Route
          path="/sources/connect/:id"
          exact={true}
          component={ConnectSources}
        />
        <Route path="/sources/:id" exact={true} component={SourceDetails} />
        <Route path="/destinations" exact={true} component={Destinations} />
        <Route
          path="/destinations/setup"
          exact={true}
          component={AddDestination}
        />
        <Route
          path="/destinations/:id"
          exact={true}
          component={DestinationDetails}
        />
      </Switch>
    </Layout>
  );
});

@inject(
  'sourcesListStore',
  'destinationsListStore',
  'connectionsStore',
  'sourceDefinitionsListStore',
  'destinationDefsListStore',
  'messagesStore',
)
@observer
class Home extends Component<IHomeProps> {
  public async componentDidMount() {
    const {
      sourcesListStore,
      destinationsListStore,
      connectionsStore,
      sourceDefinitionsListStore,
      destinationDefsListStore,
    } = this.props;
    sourcesListStore.loadAndSave();
    destinationsListStore.loadAndSave();
    connectionsStore.loadAndSave();
    await Promise.all([
      sourceDefinitionsListStore.getSourceDefinitions(),
      destinationDefsListStore.getDestinationDefs(),
    ]);
  }

  public isReadyToRender() {
    return (
      this.props.sourceDefinitionsListStore.sourceDefinitions.length > 0 &&
      this.props.destinationDefsListStore.destinationDefs.length > 0
    );
  }

  handleClose(type: string) {
    const { messagesStore } = this.props;
    if (type == 'error') {
      messagesStore.setError(false);
    }
    if (type === 'success') {
      messagesStore.setSuccess(false);
    }
  }

  getAlertContainer(messagesStore: MessagesStore) {
    if (messagesStore.isError) {
      return (
        <StyledNotification>
          <Alert
            message={messagesStore.infoString}
            type="error"
            showIcon
            closable
            afterClose={() => this.handleClose('error')}
          />
        </StyledNotification>
      );
    }
    if (messagesStore.isSuccess) {
      return (
        <StyledNotification>
          <Alert
            message={messagesStore.infoString}
            type="success"
            showIcon
            closable
            afterClose={() => this.handleClose('success')}
          />
        </StyledNotification>
      );
    }
    return null;
  }

  public renderError(messagesStore: IMessageStore) {
    if (messagesStore.isError) {
      message.error(messagesStore.infoString);
    }
    if (messagesStore.isSuccess) {
      message.success(messagesStore.infoString);
    }
  }
  public renderLayout() {
    if (this.isReadyToRender()) {
      return <RenderLayout></RenderLayout>;
    } else {
      return (
        <Layout>
          <Skeleton active />
        </Layout>
      );
    }
  }

  public render() {
    const { messagesStore } = this.props;
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sidebar />
          <Layout>
            <Container move={messagesStore.isAnimating} onAnimationEnd={() => { messagesStore.setIsAnimating(false) }}>
              <Label color="#FF0000">
                We highly recommend signing up for RudderStack Cloud to get access to features such as Transformations, Live Events, Warehouse Syncs, and more.
            </Label>
              <Flex style={{ paddingTop: '20px' }}>
                <Button type="primary" shape="round" href="https://app.rudderstack.com"> Try Now </Button>
              </Flex>
            </Container >
            {this.getAlertContainer(messagesStore)}
            {this.renderLayout()}
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default withRouter(Home);
function UseState<T>(arg0: number): [any, any] {
  throw new Error('Function not implemented.');
}

