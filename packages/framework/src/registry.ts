export type RegistryKey = string | symbol

export interface Registry {
  registerValue(key: RegistryKey, value: any): this

  registerFactory<T>(key: RegistryKey, factory: Factory<T>, options?: FactoryOptions): this

  resolve<T>(key: RegistryKey): T

  resolveAll<T>(key: RegistryKey): Array<T>

  contains(key: RegistryKey): boolean
}

export interface Factory<T> {
  (registry: Registry): T
}

interface Entry<T> {
  get(registry: Registry): T
}

class ValueEntry<T> implements Entry<T> {
  constructor(
    readonly value: T
  ) {
  }

  get(registry: Registry): T {
    return this.value
  }
}

export type FactoryOptions = {
  singleton?: boolean
}

class FactoryEntry<T> implements Entry<T> {
  constructor(
    private readonly factory: Factory<T>,
    private readonly options: FactoryOptions = {},
    private value: T = undefined
  ) {
  }

  get(registry: Registry): T {
    if (this.options.singleton) {
      if (!this.value) {
        this.value = this.factory(registry)
      }
      return this.value;
    }
    return this.factory(registry);
  }
}

export class DefaultRegistry implements Registry {

  constructor(
    private readonly entries = new Map<RegistryKey, Array<Entry<any>>>()
  ) {
  }

  registerValue(key: RegistryKey, value: any): this {
    if (!this.entries.has(key)) {
      this.entries.set(key, []);
    }
    this.entries.set(key, [new ValueEntry(value), ...this.entries.get(key)]);
    return this;
  }

  registerFactory<T>(key: RegistryKey, factory: Factory<T>, options: FactoryOptions = {}): this {
    if (!this.entries.has(key)) {
      this.entries.set(key, []);
    }
    this.entries.set(key, [new FactoryEntry(factory, options), ...this.entries.get(key)]);
    return this;
  }

  resolve<T>(key: RegistryKey): T {
    if (this.entries.has(key)) {
      return this.entries.get(key)[0].get(this);
    }

    throw new Error(`unable to resolve an entry with the key (${String(key)})`)
  }

  resolveAll<T>(key: RegistryKey): Array<T> {
    if (this.entries.has(key)) {
      return [...this.entries.get(key).map(entry => entry.get(this))];
    }
    throw new Error(`unable to resolve an entry with the key (${String(key)})`)
  }

  contains(key: RegistryKey): boolean {
    return this.entries.has(key);
  }

}
