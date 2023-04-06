import { version } from '@services/version';
import { ISourceDefintion } from '@stores/sourceDefinitionsList';
import { action, computed, observable, reaction, trace } from 'mobx';

import { IDestinationStore } from './destination';
import { IRootStore } from './index';

export interface ISourceStore {
  id: string;
  name: string;
  writeKey: string;
  enabled: boolean;
  config: JSON;
  sourceDefinitionId: any;
  sourceDef: ISourceDefintion;
  rootStore: IRootStore;
  destinations: IDestinationStore[];
  configForSDK: any;
  setName(name: string): void;
  toggleEnabled(): void;
}

export class SourceStore implements ISourceStore {
  @observable public id: string;
  @observable public name: string;
  @observable public writeKey: string;
  @observable public enabled: boolean;
  @observable public config: JSON;
  @observable public sourceDefinitionId: any;
  @observable public rootStore: IRootStore;

  constructor(source: ISourceStore, rootStore: IRootStore) {
    this.id = source.id;
    this.name = source.name;
    this.writeKey = source.writeKey;
    this.enabled = source.enabled;
    this.config = source.config;
    this.sourceDefinitionId = source.sourceDefinitionId;
    this.rootStore = rootStore;
  }

  @action.bound
  public setName(name: string): void {
    this.name = name;
  }

  @computed get sourceDef() {
    return this.rootStore.sourceDefinitionsListStore.getSourceDef(
      this.sourceDefinitionId,
    );
  }

  @computed get destinations() {
    let destIds = this.rootStore.connectionsStore.connections[this.id] || [];
    return this.rootStore.destinationsListStore.destinations.filter(dest => {
      return destIds.indexOf(dest.id) > -1;
    });
  }

  @computed get configForSDK() {
    return {
      source: {
        config: this.config,
        id: this.id,
        name: this.name,
        writeKey: this.writeKey,
        enabled: this.enabled,
        sourceDefinitionId: this.sourceDefinitionId,
        deleted: false,
        createdAt: Date(),
        updatedAt: Date(),
        sourceDefinition: this.sourceDef,
        // Filter only useNativeSDK enabled destinations and
        // includes only includeKeys (from definition) in the config
        destinations: this.destinations
          .filter(dest => {
            return dest.config ? dest.config.useNativeSDK : false;
          })
          .map(dest => {
            return {
              id: dest.id,
              name: dest.name,
              enabled: dest.enabled,
              config: dest.filteredConfig(), // Very Very Important to use filterConfig instead of config
              destinationDefinition: dest.destinationDefinition,
            };
          }),
      },
      metadata: {
        version: version,
      },
    };
  }

  // useful for debugging
  /* reaction = reaction(
    () => this.rootStore.destinationsListStore.destinations,
    dests => {
      console.log('changing...', dests);
    },
  ); */

  @action.bound
  /**
   * toggleEnabled
   */
  public async toggleEnabled() {
    this.enabled = !this.enabled;
  }
}
