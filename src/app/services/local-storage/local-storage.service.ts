import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  setData(key: string, data: any) {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
 }
 
 getData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
 }

}
