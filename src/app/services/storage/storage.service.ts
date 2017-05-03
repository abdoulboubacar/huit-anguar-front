import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  public save(key:string, value: any):void {
    localStorage.setItem(key, this.getSettable(value));
  }

  public read(key:string): any{
    return this.getGettable(localStorage.getItem(key));
  }

  public remove(key:string):void {
    localStorage.removeItem(key);
  }

  public clear():void {
    localStorage.clear();
  }

  private getSettable(value: any): string {
    return typeof value === 'string' ? value : JSON.stringify(value);
  }

  private getGettable(value: string): any {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }

}
