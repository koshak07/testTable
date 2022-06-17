import { makeAutoObservable } from "mobx";

export default class DataStore {
  constructor() {
    this._sizes = [];
    this._colors = [];
    this._brands = [];
    this._vendorCodes = [];
    this._selectedBrand = {};

    makeAutoObservable(this);
  }
  setSizes(sizes) {
    this._sizes = sizes;
  }
  setColors(colors) {
    this._colors = colors;
  }
  setBrands(brands) {
    this._brands = brands;
  }
  setSelectedBrand(brand) {
    this._selectedBrand = brand;
  }
  setVendorCodes(vendorCodes) {
    this._vendorCodes = vendorCodes;
  }
  getSizes() {
    return this._sizes;
  }
  getColors() {
    return this._colors;
  }
  getBrands() {
    return this._brands;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }
  getVendorCodes() {
    return this._vendorCodes;
  }
}
