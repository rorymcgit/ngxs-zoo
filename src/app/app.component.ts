import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { AddAnimal } from 'src/app/shared/zoo.actions';
import { ZooState, ZooStateModel } from 'src/app/shared/zoo.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  @Select(ZooState) zoo$;

  animalsInZoo: string[];

  formGroup: FormGroup;
  readonly animalFormName = 'animalForm';

  unsubscribe$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      [this.animalFormName]: [''],
    });

    this.zoo$.pipe(takeUntil(this.unsubscribe$)).subscribe((zooState: ZooStateModel) => {
      this.animalsInZoo = zooState.animals;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    const animal = this.formGroup.get(this.animalFormName).value;
    console.log('dispatching AddAnimal to zoo for: ', animal);
    this.store.dispatch(new AddAnimal(animal));
  }
}
