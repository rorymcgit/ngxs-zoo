export class AddAnimal {
  static readonly type = '[Zoo] add animal';
  constructor(public payload: string) {}
}
