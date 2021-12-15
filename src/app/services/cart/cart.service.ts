import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BreedModel } from '../dog/dog.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

const KEY_CART = "cartList";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  breedsInCartSubj = new BehaviorSubject<CartBreed[]>([]);
  breedsSelected: Map<string, CartBreed> = new Map();

  constructor(private localStorageService: LocalStorageService) { 
    const dataInLocalStorage = this.localStorageService.getData(KEY_CART);
    
    if(dataInLocalStorage) {
      this.breedsSelected = new Map(Object.entries(dataInLocalStorage));;
      this.nextBreedsInCartSubj();
    }
  }

  getBreedsInCart(): Observable<CartBreed[]> {
    return this.breedsInCartSubj;
  }

  addBreedToCart(breed: BreedModel, quantity?: number) {
    const breedInCart = this.breedsSelected.get(breed.id);
    if(breedInCart) {
      breedInCart.quantity += 1;
      breedInCart.total = breedInCart.quantity * breedInCart.breed.price;
    } else {
      this.breedsSelected.set(breed.id, {
        breed,
        quantity: 1,
        total: breed.price
      });
    }
    this.updateCart();
  }

  removeOneBreedToCard(breedId: string) {
    const breedInCart = this.breedsSelected.get(breedId);
    if(breedInCart) {
      breedInCart.quantity -= 1;
      breedInCart.total = breedInCart.quantity * breedInCart.breed.price;
      if(breedInCart.quantity <= 0) this.breedsSelected.delete(breedId);
      this.updateCart();
    }
  }

  deleteBreedFromCart(breedId: string) {
    if(this.breedsSelected.has(breedId)) {
      this.breedsSelected.delete(breedId);
      this.updateCart();
    }
  }

  clear() {
    this.breedsSelected.clear();
    this.updateCart();
  }

  private nextBreedsInCartSubj(){
    this.breedsInCartSubj.next(Array.from(this.breedsSelected.values()));
  }

  private updateDataInLocalStorage() {
    const d = Object.fromEntries(this.breedsSelected);
    this.localStorageService.setData(KEY_CART, d);
  }

  private updateCart() {
    this.updateDataInLocalStorage();
    this.nextBreedsInCartSubj();
  }
}

export interface CartBreed {
  breed: BreedModel,
  quantity: number,
  total: number
}
