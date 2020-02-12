import { HeaderDiv, LabelSmall, Text } from '@components/common/typography';
import DestinationsList from '@components/destinationsList';
import SourcesList from '@components/sourcesList';
import theme from '@css/theme';
import { IDestinationsListStore } from '@stores/destinationsList';
import { ISourceDefinitionsListStore } from '@stores/sourceDefinitionsList';
import { ISourcesListStore } from '@stores/sourcesList';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

import { BodyContainer, Container, Heading } from './styles';
import { Icon } from 'antd';

declare var LeaderLine: any;

interface IConnectionsProps {
  sourcesListStore: ISourcesListStore;
  destinationsListStore: IDestinationsListStore;
  sourceDefinitionsListStore: ISourceDefinitionsListStore;
}

@inject(
  'sourcesListStore',
  'destinationsListStore',
  'sourceDefinitionsListStore',
)
@observer
class Connections extends Component<IConnectionsProps, any> {
  linesMap: any;

  constructor(props: IConnectionsProps) {
    super(props);
    this.linesMap = {};
  }

  componentDidMount() {
    this.drawSourceConnectionLines();
  }

  componentWillUnmount() {
    this.removeSourceConnectionLines();
  }

  drawSourceConnectionLines = () => {
    let existingCombos = Object.keys(this.linesMap);
    let combos: string[] = [];
    this.props.sourcesListStore!.sources.forEach(source => {
      source.destinations.forEach(dest =>
        combos.push(`${source.id}-${dest.id}`),
      );
    });
    existingCombos.forEach(c => {
      if (!combos.includes(c)) {
        this.linesMap[c].remove();
      }
    });
    combos.forEach(c => {
      if (!existingCombos.includes(c)) {
        let line = new LeaderLine(
          document.getElementById(`fake-source-${c.split('-')[0]}`),
          document.getElementById(`fake-destination-${c.split('-')[1]}`),
          { endPlug: 'behind', color: theme.color.grey100, size: 4 },
        );
        this.linesMap[c] = line;
      }
    });
  };

  removeSourceConnectionLines = () => {
    Object.values(this.linesMap).forEach((l: any) => l.remove());
  };

  public render() {
    return (
      <Container>
        <Heading>
          <HeaderDiv color={theme.color.primary}>Connections</HeaderDiv>
        </Heading>
        <BodyContainer>
          <SourcesList linesMap={this.linesMap} />
          <DestinationsList linesMap={this.linesMap} />
        </BodyContainer>
      </Container>
    );
  }
}

export default Connections;
