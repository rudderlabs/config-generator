import { action, observable } from 'mobx';
import { IRootStore } from '.';
import { markdown } from '@components/sourcesCatalogue/sourcesConfigure';
import sources from './sources.json';

export interface ISourceDefinitionsListStore {
  sourceDefinitions: ISourceDefintion[];
  rootStore: IRootStore;
  getSourceDefinitions(): void;
  getSourceDef(id: string): ISourceDefintion;
  getFilteredSourceDefinitions(): any;
}

export interface ISourceDefintion {
  id: string;
  displayName: string;
  name: string;
}

export class SourceDefinitionsListStore implements ISourceDefinitionsListStore {
  @observable public sourceDefinitions: ISourceDefintion[] = [];
  @observable public rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
  }

  @action.bound
  public async getSourceDefinitions() {
    this.sourceDefinitions = sources;
  }

  @action.bound
  public async getFilteredSourceDefinitions() {
    const filteredSourcesArr = [] as Array<object>;
    const acceptedSources = Object.keys(markdown);
    this.sourceDefinitions.map((source: any) => {
      if (acceptedSources.includes(source.name)) {
        filteredSourcesArr.push(source);
      }
    });
    return filteredSourcesArr;
  }

  public getSourceDef(id: string) {
    return this.sourceDefinitions.filter(
      (def: ISourceDefintion) => def.id === id,
    )[0];
  }
}
