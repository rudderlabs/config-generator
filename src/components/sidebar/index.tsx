import { ButtonPrimaryFocused } from '@components/common/button';
import Svg from '@svg/index';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import {
  AvatarContainer,
  SidebarAvatar,
  SidebarLink,
  SidebarLinksContainer,
  Sider,
  UserName,
} from './styles';

export interface ISidebarProps extends RouteComponentProps<any> {}

class Sidebar extends React.Component<ISidebarProps> {
  public render() {
    return (
      <Sider trigger={null} collapsible={true} collapsed={false}>
        <AvatarContainer>
          <SidebarAvatar icon="user" />
          <UserName>RUDDER</UserName>
          {/* <ButtonPrimaryFocused
            onClick={this.signout}
            smallcase
            compact
            className="m-auto"
          >
            <Svg name="signout" />
            <span>Sign out</span>
          </ButtonPrimaryFocused> */}
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
      </Sider>
    );
  }
}

export default withRouter(Sidebar);
