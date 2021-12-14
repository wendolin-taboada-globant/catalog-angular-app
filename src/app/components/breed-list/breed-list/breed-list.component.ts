import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../../../services/cart/cart.service';
import { DogService, BreedModel } from '../../../services/dog/dog.service';

@Component({
  selector: 'breed-list',
  templateUrl: './breed-list.component.html',
  styleUrls: ['./breed-list.component.scss']
})
export class BreedListComponent implements OnInit {
  breedsObs: Observable<BreedModel[]>;
  searchText = '';

  constructor(private dogService: DogService, 
    private cartService: CartService) {}

  ngOnInit() {
    this.breedsObs = this.dogService.getBreeds();
  }

  onSearch() {
    this.dogService.setFilterBreeds(this.searchText);
  }

  onAddBreed(breed : BreedModel) {
    this.cartService.addBreedToCart(breed);
  }

}
