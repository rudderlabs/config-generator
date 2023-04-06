import { action, observable, autorun, toJS, set } from 'mobx';

import { IRootStore } from '.';
import { DestinationStore, IDestinationStore } from './destination';
import { ISourceStore } from './source';
import KSUID from 'ksuid';
import { RootStore } from './index';
import { apiServerCaller } from '@services/apiCaller';
import { config } from '@services/config';

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
  loadImportedFile(sources: any): any;
  returnWithoutRootStore(): any;
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

  public async loadAndSave() {
    await this.load();
    autoSave(this, this.save.bind(this));
  }

  public returnWithoutRootStore() {
    const destinationsListStore = toJS(this);
    delete destinationsListStore.rootStore;
    destinationsListStore.destinations.forEach(
      (destination: IDestinationStore) => {
        delete destination.rootStore;
      },
    );
    return destinationsListStore;
  }

  public async load() {
    let destinationsListStore;
    if (config.persistanceMode === 'file') {
      const resp = await apiServerCaller().get('/loadDestinations');
      destinationsListStore = resp.data.destinations;
    } else {
      destinationsListStore = localStorage.getItem('destinationsListStore');
    }
    if (destinationsListStore && destinationsListStore !== '{}') {
      const store: IDestinationsListStore = JSON.parse(destinationsListStore);
      this.destinations = store.destinations.map(
        destination => new DestinationStore(destination, this.rootStore),
      );
    }
  }
  public loadImportedFile(destinations: any) {
    this.destinations = destinations.map(
      (destination: any) => new DestinationStore(destination, this.rootStore),
    );
  }

  public save(json: string) {
    if (config.persistanceMode === 'file') {
      apiServerCaller().post('/saveDestinations', { destinations: json });
    } else {
      localStorage.setItem('destinationsListStore', json);
    }
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
      destinationDefinition:
        this.rootStore.destinationDefsListStore.getDestinationDef(
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
  ) {}
}
