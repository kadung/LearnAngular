import { Action } from "@ngrx/store";
import { Product } from "src/app/data-types/product";

// Define the action types as enum constants
export enum ProductActionType {
    TongleProductCode = '[Product] Tongle Product Code',
    SetCurrentProduct = '[Product] Set Current Product',
    ClearCurrentProduct = '[Product] Clear Current Product',
    InitializeCurrentProduct = '[Product] Initialize Current Product',
    Load = '[Product] Load',
    LoadFail = '[Product] Load Fail',
    LoadSuccess = '[Product] Load Success'
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

export class Load implements Action {
    readonly type = ProductActionType.Load
}

export class LoadFail implements Action {
    readonly type = ProductActionType.LoadFail

    constructor(public payload: string) {}
}

export class LoadSuccess implements Action {
    readonly type = ProductActionType.LoadSuccess

    constructor(public payload: Product[]) {}
}

// Define a union type for those action creators:
export type ProductActions = TongleProductCode
    | SetCurrentProduct
    | ClearCurrentProduct
    | InitializeCurrentProduct
    | Load
    | LoadFail
    | LoadSuccess;    