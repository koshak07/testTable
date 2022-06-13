import { makeAutoObservable } from "mobx";

export default class DataStore {
  constructor() {
    this._sizes = [];

    makeAutoObservable(this);
  }
  setSizes(sizes) {
    this._sizes = sizes;
  }
  getSizes() {
    return this._sizes;
  }
}
