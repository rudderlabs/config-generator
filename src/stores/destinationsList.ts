import { apiAuthCaller } from '@services/apiCaller';
import { action, observable, autorun } from 'mobx';

import { IRootStore } from '.';
import { DestinationStore, IDestinationStore } from './destination';
import { ISourceStore } from './source';
import KSUID from 'ksuid';
import { RootStore } from './index';

export interface IDestinationsListStore {
  destinations: IDestinationStore[];
  firstLoad: boolean;
  rootStore: IRootStore;
  setDestinations(destinations: IDestinationStore[]): void;
  getDestinations(): void;
  createDestination(dest: any): any;
  createDestinationConnections(dest: any, ids: string[]): any;
  deleteDestination(dest: any): any;
}

export class DestinationsListStore implements IDestinationsListStore {
  @observable public destinations: IDestinationStore[] = [];
  @observable public rootStore: IRootStore;
  @observable public firstLoad: boolean = false;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
  }

  @action.bound
  public setDestinations(destinations: IDestinationStore[]): void {
    this.destinations = destinations;
  }

  @action.bound
  public async getDestinations() {
    this.destinations = [];
    this.firstLoad = true;
  }

  @action.bound
  public async createDestination(dest: any) {
    dest = {
      config: dest.config,
      name: dest.name,
      enabled: true,
      destinationDefinition: this.rootStore.destinationDefsListStore.getDestinationDef(dest.destinationDefinitionId),
      id: KSUID.randomSync().string,
      createdAt: Date(),
      updatedAt: Date(),
      deleted: false
    }

    this.destinations.push(new DestinationStore(dest, this.rootStore));
    return dest;
  }

  @action.bound
  public async createDestinationConnections(dest: any, sourceIds: string[]) {
    // update connections store
    sourceIds.map((source, key) => {
      if (!this.rootStore.connectionsStore.connections[sourceIds[key]]) {
        this.rootStore.connectionsStore.connections[sourceIds[key]] = [];
      }
      this.rootStore.connectionsStore.connections[sourceIds[key]].push(dest.id);
    });
  }

  @action.bound
  public async deleteDestination(destination: IDestinationStore) {
    this.destinations = this.destinations.filter(existingDest => {
      return existingDest.id != destination.id;
    });

    return true;
  }

  public async deleteConnection(
    destination: IDestinationStore,
    source: ISourceStore,
  ) { }
}
