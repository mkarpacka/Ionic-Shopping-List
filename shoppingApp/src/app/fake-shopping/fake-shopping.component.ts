import {Component, OnInit} from '@angular/core';
import * as faker from 'faker'

@Component({
    selector: 'app-fake-shopping',
    templateUrl: './fake-shopping.component.html',
    styleUrls: ['./fake-shopping.component.scss'],
})
export class FakeShoppingComponent implements OnInit {

    fakeShoppingList: string[] = [];
    temp = 0;

    constructor() {
    }

    ngOnInit() {
        for (let i = 0; i < 50; i++) {
            this.addFakeData();
        }
    }

    addFakeData() {
        this.fakeShoppingList.push(faker.fake("{{commerce.product}}"));
    }

}
