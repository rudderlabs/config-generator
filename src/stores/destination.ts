import { action, computed, observable, trace } from 'mobx';

import { IRootStore } from './index';
import { ISourceStore } from './source';

export interface IDestinationStore {
  id: string;
  name: string;
  enabled: boolean;
  config: IDestinationConfig;
  destinationDefinition: any;
  sources: ISourceStore[];
  rootStore: IRootStore;
  state: string;
  setName(name: string): void;
  toggleEnabled(): void;
  updateConfig(config: any): void;
}

export interface IDestinationConfig {
  trackingId?: string; // For GA
  apiKey?: string; // For Amplitude
}

export class DestinationStore implements IDestinationStore {
  @observable public id: string;
  @observable public name: string;
  @observable public enabled: boolean;
  @observable public config: IDestinationConfig;
  @observable public destinationDefinition: any;
  @observable public rootStore: IRootStore;
  @observable public state: string;

  constructor(destination: IDestinationStore, rootStore: IRootStore) {
    this.id = destination.id;
    this.name = destination.name;
    this.enabled = destination.enabled;
    this.config = destination.config;
    this.state = destination.state;
    this.destinationDefinition = destination.destinationDefinition;
    this.rootStore = rootStore;
  }

  @action.bound
  public setName(name: string): void {
    this.name = name;
  }

  @computed get sources() {
    let sourceIds: string[] = [];
    for (var key in this.rootStore.connectionsStore.connections) {
      if (
        this.rootStore.connectionsStore.connections[key].indexOf(this.id) > -1
      ) {
        sourceIds.push(key);
      }
    }
    return this.rootStore.sourcesListStore.sources.filter(source => {
      return sourceIds.indexOf(source.id) > -1;
    });
  }

  @action.bound
  /**
   * toggleEnabled
   */
  public async toggleEnabled() {
    if (
      this.enabled == false &&
      (!this.config || Object.keys(this.config).length === 0)
    ) {
      alert('Please update your destination settings to enable');
      return;
    }
    this.enabled = !this.enabled;
  }

  @action.bound
  /**
   * updateConfig
   */
  public async updateConfig(config: any) {
    this.config = config;
  }
}
