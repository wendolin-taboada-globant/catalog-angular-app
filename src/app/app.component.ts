import { Component, OnInit } from '@angular/core';
import { CartBreed, CartService } from './services/cart/cart.service';
import { BreedModel } from './services/dog/dog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  cartCounter = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getBreedsInCart()
    .subscribe((breedsInCart: CartBreed[]) => {
      this.cartCounter = breedsInCart.reduce((prev, breed) => prev + breed.quantity, 0);
    });
  }
}
