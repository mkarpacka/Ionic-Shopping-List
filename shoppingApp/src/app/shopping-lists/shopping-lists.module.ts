import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ShoppingListsComponent} from "./shopping-lists.component";
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {SingleShoppingListComponent} from "../single-shopping-list/single-shopping-list.component";
import {EditShoppinglistComponent} from "../edit-shoppinglist/edit-shoppinglist.component";

const routes: Routes = [
  {
    path: '',
    component: ShoppingListsComponent
  },
  {
    path: 'single-list/:shoppinglist',
    component: SingleShoppingListComponent
  },
  {
    path: 'edit-shoppinglist/:shoppinglist',
    component: EditShoppinglistComponent
  }
];

@NgModule({
  declarations: [ShoppingListsComponent, SingleShoppingListComponent, EditShoppinglistComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(
      routes
    ),
    IonicModule,
    FormsModule
  ]
})
export class ShoppingListsModule { }
