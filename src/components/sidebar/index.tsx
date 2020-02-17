import { ButtonPrimaryFocused } from '@components/common/button';
import Svg from '@svg/index';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Flex } from '@components/common/misc';

import {
  AvatarContainer,
  SidebarAvatar,
  SidebarLink,
  SidebarLinksContainer,
  Sider,
  UserName,
  ImportConfigContainer,
  ImportInputButton,
} from './styles';
import { ISourcesListStore } from '@stores/sourcesList';
import { IDestinationsListStore } from '@stores/destinationsList';
import { ISourceDefinitionsListStore } from '@stores/sourceDefinitionsList';
import { IDestinationDefsListStore } from '@stores/destinationDefsList';
import { IConnectionsStore } from '@stores/connections';

export interface ISidebarProps extends RouteComponentProps<any> {
  sourcesListStore?: ISourcesListStore;
  destinationsListStore?: IDestinationsListStore;
  sourceDefinitionsListStore?: ISourceDefinitionsListStore;
  destinationDefsListStore?: IDestinationDefsListStore;
  connectionsStore?: IConnectionsStore;
}

@inject(
  'sourcesListStore',
  'destinationsListStore',
  'sourceDefinitionsListStore',
  'destinationDefsListStore',
  'connectionsStore',
)
class Sidebar extends React.Component<ISidebarProps> {
  handleFileChosen = (event: any) => {
    const file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.onloadend = e => {
      const content = fileReader.result;
      this.setupWorkspace(content);
    };
    fileReader.readAsText(file);
  };

  setupWorkspace = (jsonContent: any) => {
    const content = JSON.parse(jsonContent);
    this.props.sourcesListStore!.loadImportedFile(
      content.metadata.sourceListStore.sources,
    );
    this.props.destinationsListStore!.loadImportedFile(
      content.metadata.destinationListStore.destinations,
    );
    this.props.connectionsStore!.loadImportedFile(
      content.metadata.connectionsStore.connections,
    );
    this.props.connectionsStore!.setConnections(content.sources);
  };

  public render() {
    return (
      <Sider trigger={null} collapsible={true} collapsed={false}>
        <Flex flexDirection="column" spaceBetween style={{ height: '100vh' }}>
          <div>
            <AvatarContainer>
              <SidebarAvatar icon="user" />
              <UserName>RUDDER</UserName>
            </AvatarContainer>
            <SidebarLinksContainer>
              <SidebarLink to="/home" exact>
                <Svg name="connection" />
                <span>Connections</span>
              </SidebarLink>
              <SidebarLink to="/sources">
                <Svg name="source" />
                <span>Sources</span>
              </SidebarLink>
              <SidebarLink to="/destinations">
                <Svg name="destination" />
                <span>Destinations</span>
              </SidebarLink>
            </SidebarLinksContainer>
          </div>
          <div style={{ marginBottom: '50px' }}>
            <ImportConfigContainer>
              <ImportInputButton
                type="file"
                name="file"
                onChange={this.handleFileChosen}
              />
              Import Workspace Config
            </ImportConfigContainer>
          </div>
        </Flex>
      </Sider>
    );
  }
}

export default withRouter(Sidebar);
