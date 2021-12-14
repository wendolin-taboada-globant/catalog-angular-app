import { Component } from '@angular/core';
import { DogService, BreedModel } from './services/dog/dog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'catalog-angular-app';
  breeds: BreedModel[] = [];

  constructor(private dogService: DogService) {}

  onClick() {
    this.dogService.getBreeds()
    .subscribe((breeds: BreedModel[]) => {
      console.log("Breeds", breeds);
      this.breeds = breeds;
    });
  }
}
