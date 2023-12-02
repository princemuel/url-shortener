class StorageSingleton {
  private static instance: Readonly<StorageSingleton>;

  private constructor() {}

  public static getInstance(): Readonly<StorageSingleton> {
    if (!StorageSingleton.instance) {
      StorageSingleton.instance = Object.freeze(
        Object.seal(new StorageSingleton())
      );
    }

    return StorageSingleton.instance;
  }

  clear(): void {
    localStorage.clear();
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  getItem<T>(key: string, defaultValue: T): T {
    try {
      const items = localStorage.getItem(key);
      return items == null ? defaultValue : (JSON.parse(items) as T);
    } catch (error: any) {
      console.error(`Error parsing JSON for key "${key}": ${error.message}`);
      return defaultValue;
    }
  }

  setItem<T>(key: string, state: T) {
    try {
      const serialized = JSON.stringify(state);
      localStorage.setItem(key, serialized);
    } catch (error: any) {
      console.error(`Error storing item for key "${key}": ${error.message}`);
      return;
    }
  }

  isAvailable(type: 'localStorage' | 'sessionStorage') {
    if (typeof window === 'undefined') {
      console.warn(
        'The "window" object is not defined. Unable to check storage availability.'
      );
      return false;
    }

    let storage: Storage | null = null;
    try {
      storage = window[type];
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e: any) {
      console.error(`Storage error for type "${type}": ${e.message}`);
      return (
        (e instanceof DOMException &&
          // everything except Firefox
          (e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          storage &&
          storage.length !== 0) ??
        false
      );
    }
  }
}

export const storage = StorageSingleton.getInstance();
