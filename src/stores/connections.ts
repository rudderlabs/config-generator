import { action, observable, trace } from 'mobx';

import { IRootStore } from '.';
import { ISourceStore } from './source';
import { IDestinationStore } from './destination';
import { apiAuthCaller } from '@services/apiCaller';

export interface IConnectionsStore {
  connections: ISourceConnections;
  rootStore: IRootStore;
  setConnections(sources: ISourceStore[]): void;
  removeConnections(source: ISourceStore, destination: IDestinationStore): void;
}

export interface ISourceConnections {
  [key: string]: string[];
}

export class ConnectionsStore implements IConnectionsStore {
  @observable connections: ISourceConnections = {};
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
  }

  @action.bound
  public async setConnections(sources: ISourceStore[]) {
    let connections: ISourceConnections = {};
    sources.forEach(source => {
      connections[source.id] = source.destinations.map(dest => dest.id);
    });
    this.connections = connections;
  }

  @action.bound
  public async removeConnections(
    source: ISourceStore,
    destination: IDestinationStore,
  ) {
    const sourceIds = [source.id];
    await apiAuthCaller('token').post(
      `/destinations/${destination.id}/disconnect`,
      {
        sourceIds,
      },
    );
    let destinations: any = this.connections[source.id];
    let remainingDestinations = destinations.filter((destId: any) => {
      return destId != destination.id;
    });
    if (remainingDestinations.length > 0) {
      this.connections[source.id] = remainingDestinations;
    } else {
      delete this.connections[source.id];
    }
  }
}
