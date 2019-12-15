import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import {FakeShoppingComponent} from "./fake-shopping.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: FakeShoppingComponent
            }
        ])
    ],
    declarations: [FakeShoppingComponent]
})
export class FakeShoppingModule {}
