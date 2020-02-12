import { ButtonSmall } from '@components/common/button';
import { Flex } from '@components/common/misc';
import { IDestinationsListStore } from '@stores/destinationsList';
import { ISourcesListStore } from '@stores/sourcesList';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import DestinationView from './destinationsView/index';
import SourceView from './sourceView/index';
import { Container, PageTitle } from './styles';
import { ISourceStore } from '@stores/source';
import { IDestinationStore } from '@stores/destination';
import { IMessageStore } from '@stores/messages';

interface IConfiguredSourcesProps extends RouteComponentProps<any> {
  sourcesListStore: ISourcesListStore;
  destinationsListStore: IDestinationsListStore;
  messagesStore: IMessageStore;
}

@inject('sourcesListStore', 'destinationsListStore', 'messagesStore')
@observer
class SourceDetails extends Component<IConfiguredSourcesProps, any> {
  constructor(props: IConfiguredSourcesProps) {
    super(props);
    this.state = {
      sourceId: props.match && props.match.params.id,
      stats: [],
      overview: true,
    };
  }

  public async componentDidMount() {
    await this.getStats();
  }

  public getStats = async () => {
    const { sourceId } = this.state;
  };

  public toggle = async (val: any) => {
    this.setState(val);
  };

  deleteConnection = async (
    source: ISourceStore,
    destination: IDestinationStore,
  ) => {
    const { destinationsListStore, messagesStore } = this.props;
    try {
      await destinationsListStore.rootStore.connectionsStore.removeConnections(
        source,
        destination,
      );
      messagesStore.showSuccessMessage('Connection deletion successful');
    } catch (error) {
      messagesStore.showErrorMessage('Failed to delete connection');
    }
  };

  deleteSource = async (source: ISourceStore) => {
    const { sourcesListStore, messagesStore } = this.props;
    try {
      const isSuccess = await sourcesListStore.deleteSource(source);
      if (!isSuccess) {
        throw Error('error deleting source');
      }
      messagesStore.showSuccessMessage('Source deletion successful');
      this.props.history.push(`/home`);
    } catch (error) {
      messagesStore.showErrorMessage('Failed to delete source');
    }
  };

  public renderButtons = () => {
    const { overview } = this.state;

    return (
      <div className={'m-b-md'}>
        <Flex flexDirection="row" spaceBetween={true}>
          {overview ? (
            <>
              <ButtonSmall pink={true}>Overview</ButtonSmall>
              <ButtonSmall onClick={() => this.toggle({ overview: false })}>
                Live Events
              </ButtonSmall>
            </>
          ) : (
            <>
              <ButtonSmall onClick={() => this.toggle({ overview: true })}>
                Overview
              </ButtonSmall>
              <ButtonSmall pink={true}>Live Events</ButtonSmall>
            </>
          )}
        </Flex>
      </div>
    );
  };

  public renderOverView = () => {
    const { sourceId, stats, overview } = this.state;
    const { sourcesListStore } = this.props;
    const { sources } = sourcesListStore;
    const source = sources.find(source => source.id === sourceId);
    if (source) {
      return (
        <>
          <div className={'m-b-lg'}>
            <SourceView source={source} deleteSource={this.deleteSource} />
          </div>
          <div className={'m-b-lg'}>
            <DestinationView
              destinations={source!.destinations}
              sourceId={source!.id}
              source={source}
              deleteConnection={this.deleteConnection}
            />
          </div>
        </>
      );
    }
    return null;
  };

  public toggleRender = () => {
    const { overview } = this.state;
    return this.renderOverView();
  };

  public render() {
    const { sourceId, stats, overview } = this.state;
    const { sourcesListStore } = this.props;
    const { sources } = sourcesListStore;
    const source = sources.find(source => source.id === sourceId);
    return (
      <Container>
        <Flex flexDirection="row" spaceBetween={true}>
          <PageTitle>Source {overview ? 'Details' : 'Debugger'}</PageTitle>
          <div style={{ width: '260px' }}>{this.renderButtons()}</div>
        </Flex>
        <Flex flexDirection="column">{this.toggleRender()}</Flex>
      </Container>
    );
  }
}

export default withRouter(SourceDetails);
