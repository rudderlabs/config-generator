import { apiAuthCaller } from '@services/apiCaller';
import { action, observable, autorun } from 'mobx';

import { IRootStore } from '.';
import { DestinationStore, IDestinationStore } from './destination';
import { ISourceStore } from './source';

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
    // const res = await apiAuthCaller('token').get(`/destinations?workspace_id=`);
    // this.destinations = res.data.destinations.map(
    //   (destination: IDestinationStore) =>
    //     new DestinationStore(destination, this.rootStore),
    // );
    this.destinations = [];
    this.firstLoad = true;
  }

  @action.bound
  public async createDestination(dest: any) {
    const res = await apiAuthCaller('token').post(`/destinations/`, {
      name: dest.name,
      destinationDefinitionId: dest.destinationDefinitionId,
      config: dest.config,
    });
    const savedDest = res.data;
    this.destinations.push(new DestinationStore(savedDest, this.rootStore));
    return savedDest;
  }

  @action.bound
  public async createDestinationConnections(dest: any, sourceIds: string[]) {
    await apiAuthCaller('token').post(`/destinations/${dest.id}/connect`, {
      sourceIds,
    });
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
    const res = await apiAuthCaller('token').delete(
      `/destinations/${destination.id}`,
    );
    const isDest: IDestinationStore = res.data;
    if (isDest.id) {
      this.destinations = this.destinations.filter(existingDest => {
        return existingDest.id != destination.id;
      });
      await this.rootStore.sourcesListStore.getSources();
    } else {
      console.log('deleting destination failed');
    }
    return true;
  }

  public async deleteConnection(
    destination: IDestinationStore,
    source: ISourceStore,
  ) {}
}
