import { makeAutoObservable } from "mobx";

export default class DataStore {
  constructor() {
    this._sizes = [];
    this._colors = [];
    this._brands = [];
    this._vendorCodes = [];
    this._nomenclatures = {};
    this._selectedBrand = {};
    this._selectedVendorCode = {};
    this._selectedSize = {};
    this._selectedColor = {};

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
  setVendorCodes(vendorCodes) {
    this._vendorCodes = vendorCodes;
  }
  setNomenclature(nomenclatures) {
    this._nomenclatures = nomenclatures;
  }
  setSelectedBrand(brand) {
    this._selectedBrand = brand;
  }
  setSelectedVendorCode(vendorCode) {
    this._selectedVendorCode = vendorCode;
  }
  setSelectedSize(size) {
    this._selectedSize = size;
  }
  setSelectedColor(color) {
    this._selectedColor = color;
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
  getVendorCodes() {
    return this._vendorCodes;
  }
  getNomenclature() {
    return this._nomenclatures;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }
  get selectedVendorCode() {
    return this._selectedVendorCode;
  }
  get selectedSize() {
    return this._selectedSize;
  }
  get selectedColor() {
    return this._selectedColor;
  }
}
