import { action, observable } from 'mobx';
import { apiCaller } from '@services/apiCaller';
import { IRootStore } from '.';

export interface ISourceDefinitionsListStore {
  sourceDefinitions: ISourceDefintion[];
  rootStore: IRootStore;
  getSourceDefinitions(): void;
  getSourceDef(id: string): ISourceDefintion;
}

export interface ISourceDefintion {
  id: string;
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
    const res = await apiCaller().get(`/source-definitions`);
    this.sourceDefinitions = res.data;
  }

  public getSourceDef(id: string) {
    return this.sourceDefinitions.filter(
      (def: ISourceDefintion) => def.id === id,
    )[0];
  }
}
