import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreedListComponent } from './components/breed-list/breed-list/breed-list.component';
import { CartListComponent } from './components/cart-list/cart-list/cart-list.component';

const routes: Routes = [
  {path: '', component: BreedListComponent},
  {path: 'cart-list', component: CartListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
