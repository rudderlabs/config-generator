import { apiAuthCaller } from '@services/apiCaller';
import { IRootStore } from '@stores/index';
import { ISourceStore, SourceStore } from '@stores/source';
import { action, autorun, observable, set, toJS } from 'mobx';
import KSUID from 'ksuid';

export interface ISourcesListStore {
  sources: ISourceStore[];
  firstLoad: boolean;
  rootStore: IRootStore;
  setSources(sources: ISourceStore[]): void;
  getSources(): void;
  createSource(source: any): any;
  deleteSource(source: ISourceStore): any;
  loadAndSave(): any;
}

function autoSave(store: any, save: any) {
  let firstRun = true;
  autorun(() => {
    const sourcesListStore = toJS(store);
    delete sourcesListStore.rootStore;
    sourcesListStore.sources.forEach((source: ISourceStore) => {
      delete source.rootStore;
    });
    const json = JSON.stringify(sourcesListStore);
    if (!firstRun) {
      save(json);
    }
    firstRun = false;
  });
}

export class SourcesListStore implements ISourcesListStore {
  @observable public sources: ISourceStore[] = [];
  @observable public rootStore: IRootStore;
  @observable public firstLoad: boolean = false;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
  }

  public loadAndSave() {
    this.load();
    autoSave(this, this.save.bind(this));
  }

  public load() {
    const sourcesListStore = localStorage.getItem('sourcesListStore');
    if (sourcesListStore) {
      const store: ISourcesListStore = JSON.parse(sourcesListStore);
      this.sources = store.sources.map(
        source => new SourceStore(source, this.rootStore),
      );
    }
  }

  public save(json: string) {
    localStorage.setItem('sourcesListStore', json);
  }

  @action.bound
  public setSources(sources: ISourceStore[]): void {
    this.sources = sources;
  }

  @action.bound
  public async getSources() {
    // const res = await apiAuthCaller('token').get(`/sources?workspace_id=`);
    // this.sources = res.data.sources.map(
    //   (source: ISourceStore) => new SourceStore(source, this.rootStore),
    // );
    // this.rootStore.connectionsStore.setConnections(res.data.sources);
    this.sources = [];
    this.firstLoad = true;
  }

  @action.bound
  public async createSource(source: any) {
    source = {
      ...source,
      id: KSUID.randomSync().string,
      writeKey: KSUID.randomSync().string,
      enabled: true,
      config: {},
      destinations: [],
      createdAt: Date(),
      updatedAt: Date(),
    };

    // const savedSource = res.data;
    this.sources.push(new SourceStore(source, this.rootStore));
    return source;
  }

  @action.bound
  public async deleteSource(source: ISourceStore) {
    // const res = await apiAuthCaller('token').delete(`/sources/${source.id}`);
    // const isSource: ISourceStore = res.data;
    this.sources = this.sources.filter(existingSource => {
      return existingSource.id != source.id;
    });

    return true;
  }
}
