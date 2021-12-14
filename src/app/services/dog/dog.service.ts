import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../../../assets/config.json';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { combineLatestWith, map } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage/local-storage.service';

const KEY_BREEDS = "breeds";

@Injectable({
  providedIn: 'root'
})
export class DogService {
  breedsSubj = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, 
    private localStorageService: LocalStorageService) { }

  getBreeds(): Observable<BreedModel[]> {
    let dataObs = this.http.get<IBreed[]>(config.breedUrl, {
      headers: {"x-api-key": config.apiKey}
    }).pipe(map(this.mappingBreeds));

    const dataInLocalStorage = <BreedModel[]>this.localStorageService.getData(KEY_BREEDS);

    if(dataInLocalStorage) {
      dataObs = of(dataInLocalStorage);
    }

    return dataObs.pipe(combineLatestWith(this.breedsSubj),
    map(([breeds, filter]) => {
      this.localStorageService.setData(KEY_BREEDS, breeds);
      return breeds.filter(({id, name, bredFor, breedGroup, origin, temperament}) =>
        name.includes(filter) || bredFor.includes(filter) || breedGroup.includes(filter) || origin.includes(filter) || temperament.includes(filter))
    }));
  }

  setFilterBreeds(searchText: string) {
    this.breedsSubj.next(searchText);
  }

  private mappingBreeds(breeds: IBreed[]): BreedModel[] {
    return breeds.map(breed => ({
      id: String(breed.id),
      name: breed.name,
      bredFor: breed.bred_for || '',
      breedGroup: breed.breed_group || '',
      height: breed.height.imperial,
      image: breed.image.url,
      origin: breed.origin || '',
      temperament: breed.temperament || '',
      weight: breed.weight.imperial,
      price: Math.floor(Math.random() * 1000)
    }));
  }
}

export interface BreedModel {
  id: string;
  name: string;
  bredFor: string;
  breedGroup: string;
  height: string;
  image: string;
  origin: string;
  temperament: string;
  weight: string;
  price: number;
}

export interface IBreed {
  "id": string;
  "name": string;
  "bred_for"?: string;
  "breed_group"?: string;
  "height": IMeasure;
  "image": IImage;
  "life_span": string;
  "reference_image_id": string;
  "temperament"?: string;
  "origin"?: string;
  "weight": IMeasure;
}

export interface IMeasure {
  imperial: string;
  metric: string;
}

export interface IImage {
  id: string;
  url: string;
  height: number;
  width: number;
}
