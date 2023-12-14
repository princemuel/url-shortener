class StorageSingleton {
  private static _instance: Readonly<StorageSingleton> | null = null;
  private __type: 'local' | 'session';
  private isStorageAvailable: boolean;

  private constructor(type: 'local' | 'session') {
    if (StorageSingleton._instance != null) {
      throw new Error(
        "Singleton instance already exists. Please use the 'getInstance' method."
      );
    }

    this.__type = type;
    this.isStorageAvailable = this.checkStorageAvailability();
  }

  public static get instance() {
    if (StorageSingleton._instance == null) {
      throw new Error(
        'Singleton instance not created. Use getInstance method.'
      );
    }

    return StorageSingleton._instance;
  }

  public static getInstance(type: 'local' | 'session') {
    if (StorageSingleton._instance == null) {
      StorageSingleton._instance = Object.freeze(
        Object.seal(new StorageSingleton(type))
      );
    }

    return StorageSingleton._instance;
  }

  private checkStorageAvailability() {
    if (typeof window === 'undefined') {
      console.warn(
        'The "window" object is not defined. Unable to check storage availability'
      );
      return false;
    }

    const storage = this.getStorage();

    try {
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e: any) {
      console.error(`Storage error for type "${this.__type}": ${e.message}`);
      return (
        (e instanceof DOMException &&
          (e.code === 22 ||
            e.code === 1014 ||
            e.name === 'QuotaExceededError' ||
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          storage &&
          storage.length !== 0) ??
        false
      );
    }
  }

  private getStorage() {
    return this.__type === 'local' ? localStorage : sessionStorage;
  }

  isAvailable() {
    return this.isStorageAvailable;
  }

  clear(): void {
    this.getStorage().clear();
  }

  removeItem(key: string): void {
    this.getStorage().removeItem(key);
  }

  getItem<T>(key: string, defaultValue: T): T {
    try {
      const items = this.getStorage().getItem(key);
      return items ? (JSON.parse(items) as T) : defaultValue;
    } catch (error: any) {
      console.error(`Error parsing JSON for key "${key}": ${error.message}`);
      return defaultValue;
    }
  }

  setItem<T>(key: string, state: T) {
    try {
      const serialized = JSON.stringify(state);
      this.getStorage().setItem(key, serialized);
    } catch (error: any) {
      console.error(`Error storing item for key "${key}": ${error.message}`);
    }
  }
}

export const storage = StorageSingleton.getInstance('local'); // or 'session'
