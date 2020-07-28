import { action, observable } from 'mobx';
import { IRootStore } from '.';
import _ from 'lodash';
import destinations from './destinations.json';

export interface IDestinationDefsListStore {
  destinationDefs: IDestinationDef[];
  rootStore: IRootStore;
  getDestinationDefs(): void;
  getDestinationDef(id: string): IDestinationDef;
}

export interface IDestinationDef {
  id: string;
  name: string;
  displayName: string;
  config: any;
}

export class DestinationDefsListStore implements IDestinationDefsListStore {
  @observable public destinationDefs: IDestinationDef[] = [];
  @observable public rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
  }

  @action.bound
  public async getDestinationDefs() {
    this.destinationDefs = _.orderBy(
      destinations,
      [dest => dest.displayName.toString().toLowerCase()],
      ['asc'],
    );
  }

  public getDestinationDef(id: string) {
    return this.destinationDefs.filter(
      (def: IDestinationDef) => def.id === id,
    )[0];
  }
}
