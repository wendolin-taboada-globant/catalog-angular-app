import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../../../assets/config.json';
import { Observable } from 'rxjs';
import { combineLatestAll, concatAll, map, mergeAll } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DogService {

  constructor(private http: HttpClient) { }

  getBreeds(): Observable<BreedModel[]> {
    return this.http.get<IBreed[]>(config.breedUrl, {
      headers: {"x-api-key": config.apiKey}
    }).pipe(map(mappingBreeds));
  }
}

function mappingBreeds(breeds: IBreed[]): BreedModel[] {
  return breeds.map(breed => ({
    id: breed.id,
    name: breed.name,
    breedFor: breed.bread_for,
    breedGroup: breed.breag_group || '',
    height: breed.height.imperial,
    image: breed.image.url,
    origin: breed.origin || '',
    temperament: breed.temperament,
    weight: breed.weight.imperial
  }));
}

export interface BreedModel {
  id: string;
  name: string;
  breedFor: string;
  breedGroup: string;
  height: string;
  image: string;
  origin: string;
  temperament: string;
  weight: string;
}

export interface IBreed {
  "id": string;
  "name": string;
  "bread_for": string;
  "breag_group"?: string;
  "height": IMeasure;
  "image": IImage;
  "life_span": string;
  "reference_image_id": string;
  "temperament": string;
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
