import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  set(value: any, key: string) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  get<T = any>(key: string): T | null {
    const json = localStorage.getItem(key);
    if (!json) return null;
    return JSON.parse(json);
  }
  remove(key: string) {
    localStorage.removeItem(key);
  }
}
