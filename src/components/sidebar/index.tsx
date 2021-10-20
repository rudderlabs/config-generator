import Svg from '@svg/index';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Tooltip } from 'antd';
import { inject, observer } from 'mobx-react';

import {
  AvatarContainer,
  SidebarAvatar,
  SidebarLink,
  SidebarLinksContainer,
  Sider,
  UserName,
} from './styles';
import { IMessageStore } from '@stores/messages';

export interface ISidebarProps extends RouteComponentProps {
  messagesStore? : IMessageStore;
}

@inject(
  'messagesStore',
) 

@observer
class Sidebar extends React.Component<ISidebarProps> {

  public render() {
    const {messagesStore} = this.props;
    return (
      <Sider trigger={null} collapsible={true} collapsed={false}>
        <AvatarContainer>
          <SidebarAvatar icon="user" />
          <UserName>RUDDERSTACK</UserName>
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
          <Tooltip placement="right" title="Please try Ruderstack Control Plane for this feature">
            <div onClick = {()=> {if(messagesStore) { 
              messagesStore.setIsAnimating(true)}}} >
          <SidebarLink dim to="/transformation">            
            <Svg name="transformation" />
            <span>Transformations</span>
          </SidebarLink>
          </div>
          </Tooltip>
          <Tooltip placement="bottom" title="Please try Ruderstack Control Plane for this feature">
          <div onClick = {()=> {if(messagesStore) { 
              messagesStore.setIsAnimating(true)}}} >
          <SidebarLink dim to="/syncs">
            <Svg name="sync" />
            <span> Syncs </span>
          </SidebarLink>
          </div>
          </Tooltip>         
        </SidebarLinksContainer>
      </Sider>
    );
  }
}

export default withRouter(Sidebar);
