import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as appStore from '../store';

@Component({
  selector: 'app-fitment-container',
  templateUrl: './fitment-container.component.html',
  styleUrls: ['./fitment-container.component.css']
})
export class FitmentContainerComponent implements OnInit, OnDestroy {
  data$: Observable<any>;
  selectedType: string = 'years';
  breadCrumbs: any[] = [];
  vehicle: string;
  showMessage: boolean = true;

  // import the store into the constructor
  constructor(private _store: Store<appStore.FitmentState>) {}

  // This ngOnInit will be useful when you want to any stuff when component intialiaze. Since i didn't have requirement to do any thing here i just added without any implementation
  ngOnInit() {}

  getYears() {
    this._store.dispatch(new appStore.LoadYears(this.breadCrumbs));
    this.data$ = this._store.pipe(select(appStore.allYears));
    this.resetFilters();
  }

  OnItemClick(nextType: string, value: string) {
    this.selectedType = nextType;
    this.setBreadCrumbs(nextType, value);
    switch (nextType) {
      case 'makes':
        this._store.dispatch(new appStore.LoadMakes(this.breadCrumbs));
        this.data$ = this._store.pipe(select(appStore.make));
        break;
      case 'models':
        this._store.dispatch(new appStore.LoadModels(this.breadCrumbs));
        this.data$ = this._store.pipe(select(appStore.model));
        break;
      case 'trim':
        this._store.dispatch(new appStore.LoadTrim(this.breadCrumbs));
        this.data$ = this._store.pipe(select(appStore.trim));
        break;
    }
  }

  setBreadCrumbs(type: string, value: string) {
    let vehicle = '';
    let breadCrumbs: any[] = JSON.parse(JSON.stringify(this.breadCrumbs));
    const index = this.breadCrumbs.findIndex(x => x.val === value);
    if (index == -1) {
      breadCrumbs.push({ key: type, val: value });
    } else {
      breadCrumbs.splice(index + 1, this.breadCrumbs.length);
    }
    this.breadCrumbs = breadCrumbs;

    this.breadCrumbs.forEach(item => {
      vehicle += ' ' + item.val;
    });
    this.vehicle = vehicle;
  }

  resetFilters() {
    this.breadCrumbs = [];
    this.vehicle = '';
  }

  // This will trigger before moving out from the component
  ngOnDestroy() {}
}
