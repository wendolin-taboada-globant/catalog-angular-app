import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CartBreed, CartService } from 'src/app/services/cart/cart.service';
import { BreedModel } from 'src/app/services/dog/dog.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  cartSummaryObs: Observable<CartSummary>;
  cartList: CartBreed[] = [];
  constructor(private cartService: CartService) { }

  ngOnInit(){
    this.cartSummaryObs = this.cartService.getBreedsInCart().pipe(
      map(cartList => {
        const [totalItems, totalPrice] = cartList.reduce(([quantity, total], curr) => {
          return [quantity + curr.quantity, total + curr.total];
        }, [0,0]);

        return {
          cartList,
          totalItems,
          totalPrice
        }
      })
    );
  }

  onClear() {
    this.cartService.clear();
  }

  onAdd(breed: BreedModel) {
    this.cartService.addBreedToCart(breed);
  }

  onRemoveOne(breedId: string) {
    this.cartService.removeOneBreedToCard(breedId);
  }

  onDelete(breedId: string) {
    this.cartService.deleteBreedFromCart(breedId);
  }
}

interface CartSummary {
  cartList: CartBreed[];
  totalItems: number;
  totalPrice: number;
}
