import { Action } from "@ngrx/store";
import { Product } from "src/app/models/product";

// Define the action types as enum constants
export enum ProductActionType {
    TongleProductCode = '[Product] Tongle Product Code',
    SetCurrentProduct = '[Product] Set Current Product',
    ClearCurrentProduct = '[Product] Clear Current Product',
    InitializeCurrentProduct = '[Product] Initialize Current Product',
}

// Build the action creator for each action
export class TongleProductCode implements Action {
    readonly type = ProductActionType.TongleProductCode;

    constructor (public payload: boolean) {}
}

export class SetCurrentProduct implements Action {
    readonly type = ProductActionType.SetCurrentProduct;

    constructor (public payload: Product) {}
}

export class ClearCurrentProduct implements Action {
    readonly type = ProductActionType.ClearCurrentProduct;
}

export class InitializeCurrentProduct implements Action {
    readonly type = ProductActionType.InitializeCurrentProduct;
}

// Define a union type for those action creators:
export type ProductActions = TongleProductCode
    | SetCurrentProduct
    | ClearCurrentProduct
    | InitializeCurrentProduct;    