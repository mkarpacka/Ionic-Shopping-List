import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-shopping-lists',
    templateUrl: './shopping-lists.component.html',
    styleUrls: ['./shopping-lists.component.scss'],
})

export class ShoppingListsComponent implements OnInit {

    shoppingLists: ShoppingList[] = [];
    listName: string = "";
    options = {
        search: false,
        add: false,
        filter: false,
        sort: false
    };
    selectedSort: any;
    selectedFilter: any;
    checkIfExists: boolean;

    constructor(private route: ActivatedRoute,
                private router: Router, private storage: Storage) {
    }

    ngOnInit() {
        this.readFromStorage();
    }

    handleAddOption() {
        this.options.add = true;
        this.options.search = false;
        this.options.filter = false;
        this.options.sort = false;
    }

    handleSearchOption() {
        this.options.add = false;
        this.options.search = true;
        this.options.filter = false;
        this.options.sort = false;
    }

    handleFilterOption() {
        this.options.add = false;
        this.options.search = false;
        this.options.filter = true;
        this.options.sort = false;
    }

    handleSortOptions() {
        this.options.add = false;
        this.options.search = false;
        this.options.filter = false;
        this.options.sort = true;
    }

    handleGenerate() {
        this.options.add = false;
        this.options.search = false;
        this.options.filter = false;
        this.options.sort = false;
    }

    saveToStorage() {
        this.storage.set('shopping-lists', this.shoppingLists);
    }

    readFromStorage() {
        this.storage.get('shopping-lists').then((val) => {
            if (val) this.shoppingLists = val;
        });
    }

    addNewShoppingList() {
        this.checkIfExists = this.shoppingLists.map(a=>a.name).indexOf(this.listName) > -1;
        if (this.listName.length > 0 && !this.checkIfExists) {
            let shoppingList = {name: this.listName, completed: false, items: []};
            this.shoppingLists.push(shoppingList);
            this.listName = '';
            this.saveToStorage();
        }
    }

    toggleComplete = (index: number): void => {
        this.shoppingLists[index].completed = !this.shoppingLists[index].completed;
        this.saveToStorage();
    }


    navigateToSingleList(shoppingList) {
        this.router.navigate(['/single-list/' + JSON.stringify(shoppingList)]);
    }

    removeItem(index: number) {
        this.shoppingLists.splice(index, 1);
        this.saveToStorage();
    }

    onSearchTerm($event: CustomEvent) {
        const val = $event.detail.value;
        if (val && val.trim() !== '') {
            this.shoppingLists = this.shoppingLists.filter(term => {
                return term.name.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
            });
        } else {
            this.readFromStorage();
        }
    }

    sortAscending() {
        this.shoppingLists.sort((a, b) => a.name.localeCompare(b.name));
    }

    sortDescending() {
        const ascending = this.shoppingLists.sort((a, b) => a.name.localeCompare(b.name));
        ascending.sort().reverse();
    }

    sort() {
        if(this.selectedSort == 'high'){
            this.sortAscending();
        }
        if(this.selectedSort == 'low'){
            this.sortDescending();
        }
    }

    filter() {
        if(this.selectedFilter == 'all'){
            this.readFromStorage()
        }
        if(this.selectedFilter == 'completed'){
            this.shoppingLists = this.shoppingLists.filter(term => {
                return term.completed
            });
        }
        if(this.selectedFilter == 'inprogress'){
            this.shoppingLists = this.shoppingLists.filter(term => {
                return !term.completed
            });
        }
    }


}
