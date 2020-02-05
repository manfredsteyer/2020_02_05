
export interface Brand {
    readonly id: number;
    readonly name: string;
    readonly productGroups: Array<ProductGroup>;
}

export interface ProductGroup {
    readonly id: number;
    readonly name: string;
    readonly products: Array<Product>;
}

export interface Product {
    readonly id: number;
    readonly name: string;
    readonly sizes: Array<Size>;
}

export interface Size {
    readonly id: number;
    readonly name: string;
    readonly menge: number;
}


export interface FullSizeId {
    readonly brandId: number;
    readonly productGroupId: number;
    readonly productId: number;
    readonly sizeId: number;
}