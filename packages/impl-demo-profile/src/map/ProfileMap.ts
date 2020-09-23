export interface ProfileMapObserver {
  repositoryId: string
  listener: ProfileMapObserverListener
}

export interface ProfileMapObserverListener {
  (profileMap: ProfileMap): void
}

export class ProfileMap implements Map<string, string> {
  readonly [Symbol.toStringTag]: string;

  constructor(
    public repositoryId: string,
    private map: Map<string, string> = new Map(),
    private observers: Set<ProfileMapObserver> = new Set()
  ) {
    this[Symbol.toStringTag] = this.map[Symbol.toStringTag]
  }

  addObserver(listener: ProfileMapObserverListener) {
    this.observers.add({
      repositoryId: this.repositoryId,
      listener
    });
  }

  removeObservers() {
    for (const observer of this.observers) {
      if (observer.repositoryId === this.repositoryId) {
        this.observers.delete(observer);
      }
    }
  }

  private notifyObservers() {
    for (const observers of this.observers) {
      if (observers.repositoryId !== this.repositoryId) {
        observers.listener(this.clone(this.repositoryId));
      }
    }
  }

  get size() {
    return this.map.size;
  }

  clear(): void {
    this.map.clear();
  }

  delete(key: string): boolean {
    return this.map.delete(key);
  }

  forEach(callbackfn: (value: string, key: string, map: Map<string, string>) => void, thisArg?: any): void {
    this.map.forEach(callbackfn, thisArg);
  }

  get(key: string): string | undefined {
    return this.map.get(key);
  }

  has(key: string): boolean {
    return this.map.has(key);
  }

  set(key: string, value: string): this {
    this.map.set(key, value);
    return this;
  }

  [Symbol.iterator](): IterableIterator<[string, string]> {
    return this.map[Symbol.iterator]();
  }

  entries(): IterableIterator<[string, string]> {
    return this.map.entries();
  }

  keys(): IterableIterator<string> {
    return this.map.keys();
  }

  values(): IterableIterator<string> {
    return this.map.values();
  }

  clone(repositoryId: string): ProfileMap {
    return new ProfileMap(
      repositoryId,
      new Map(this.map.entries()),
      this.observers
    );
  }

  done() {
    this.notifyObservers();
  }

  replaceBy(profileMap: ProfileMap): ProfileMap {
    this.map = profileMap.map;
    return this;
  }
}
