import { apiAuthCaller } from '@services/apiCaller';
import { action, observable, autorun, toJS, set } from 'mobx';

import { IRootStore } from '.';
import { DestinationStore, IDestinationStore } from './destination';
import { ISourceStore } from './source';
import KSUID from 'ksuid';

export interface IDestinationsListStore {
  destinations: IDestinationStore[];
  firstLoad: boolean;
  rootStore: IRootStore;
  setDestinations(destinations: IDestinationStore[]): void;
  getDestinations(): void;
  createDestination(dest: any): any;
  createDestinationConnections(dest: any, ids: string[]): any;
  deleteDestination(dest: any): any;
  loadAndSave(): any;
}

function autoSave(store: any, save: any) {
  let firstRun = true;
  autorun(() => {
    const destinationsListStore = toJS(store);
    delete destinationsListStore.rootStore;
    destinationsListStore.destinations.forEach(
      (destination: IDestinationStore) => {
        delete destination.rootStore;
      },
    );
    const json = JSON.stringify(destinationsListStore);
    if (!firstRun) {
      save(json);
    }
    firstRun = false;
  });
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

  public loadAndSave() {
    this.load();
    autoSave(this, this.save.bind(this));
  }

  public load() {
    const destinationsListStore = localStorage.getItem('destinationsListStore');
    if (destinationsListStore) {
      const store: IDestinationsListStore = JSON.parse(destinationsListStore);
      this.destinations = store.destinations.map(
        destination => new DestinationStore(destination, this.rootStore),
      );
    }
  }

  public save(json: string) {
    localStorage.setItem('destinationsListStore', json);
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
    // const res = await apiAuthCaller('token').post(`/destinations/`, {
    //   name: dest.name,
    //   destinationDefinitionId: dest.destinationDefinitionId,
    //   config: dest.config,
    // });
    dest = {
      config: dest.config,
      name: dest.name,
      enabled: true,
      destinationDefinition: this.rootStore.destinationDefsListStore.getDestinationDef(
        dest.destinationDefinitionId,
      ),
      id: KSUID.randomSync().string,
      createdAt: Date(),
      updatedAt: Date(),
      deleted: false,
    };

    this.destinations.push(new DestinationStore(dest, this.rootStore));
    return dest;
  }

  @action.bound
  public async createDestinationConnections(dest: any, sourceIds: string[]) {
    // await apiAuthCaller('token').post(`/destinations/${dest.id}/connect`, {
    //   sourceIds,
    // });
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
