import * as React from 'react';
import {
  IDestinationDefsListStore,
  IDestinationDef,
} from '../../stores/destinationDefsList';
import { inject, observer } from 'mobx-react';
import { Heading } from '@components/connections/styles';
import { HeaderDiv, LabelMedium } from '@components/common/typography';
import theme from '@css/theme';
import IconCardList from '@components/iconCardList';
import { Drawer } from 'antd';
import DestinationConfigure from './destinationsConfigure/index';

export interface IDestinationsCatalogueProps {
  destinationDefsListStore?: IDestinationDefsListStore;
}

export interface IDestinationsCatalogueState {
  modalVisible: boolean;
  selected?: IDestinationDef;
}

@inject('destinationDefsListStore')
@observer
export default class DestinationsCatalogue extends React.Component<
  IDestinationsCatalogueProps,
  IDestinationsCatalogueState
> {
  constructor(props: IDestinationsCatalogueProps) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }
  handleCancel = () => {
    this.setState({ modalVisible: false });
  };
  onClick = (destinationDef: any) => {
    // Add a modal and open it on click.
    this.setState({ modalVisible: true, selected: destinationDef });
  };

  public render() {
    const { destinationDefsListStore } = this.props;
    const { selected } = this.state;
    if (destinationDefsListStore)
      return (
        <div>
          <Drawer
            visible={this.state.modalVisible}
            onClose={this.handleCancel}
            width={'40%'}
          >
            <DestinationConfigure destinationDef={selected} />
          </Drawer>
          <Heading>
            <HeaderDiv color={theme.color.primary}>Destinations</HeaderDiv>
            <LabelMedium color={theme.color.grey300}>
              {destinationDefsListStore!.destinationDefs.length}
              &nbsp;Available
            </LabelMedium>
          </Heading>
          <IconCardList
            type="destination"
            selectionMode="none"
            icons={destinationDefsListStore.destinationDefs.map(
              destinationDef => ({
                id: destinationDef.id,
                type: destinationDef.name,
                title: destinationDef.displayName,
                onClick: () => this.onClick(destinationDef),
              }),
            )}
            onSelectionChange={() => {}}
          />
        </div>
      );
  }
}
