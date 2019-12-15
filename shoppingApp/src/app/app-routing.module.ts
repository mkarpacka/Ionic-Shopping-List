import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'shopping-lists',
    loadChildren: () => import('./shopping-lists/shopping-lists.module').then(m=>m.ShoppingListsModule)
  },
  {
    path: 'fake-shopping',
    loadChildren: () => import('./fake-shopping/fake-shopping.module').then(m=>m.FakeShoppingModule)
  },
  {
    path: 'pdf',
    loadChildren: () => import('./pdf/pdf.module').then(m=>m.PdfModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
