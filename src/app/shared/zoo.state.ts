import { State, Action, StateContext } from '@ngxs/store';
import { append, patch } from '@ngxs/store/operators';
import { AddAnimal } from 'src/app/shared/zoo.actions';

export interface ZooStateModel {
  animals: string[];
}

@State<ZooStateModel>({
  name: 'zoo',
  defaults: {
    animals: [],
  },
})
export class ZooState {

  @Action(AddAnimal)
  addAnimal(ctx: StateContext<ZooStateModel>, { payload }: AddAnimal) {
    ctx.setState(
      patch({
        animals: append([payload]),
      })
    );
  }
}
