export interface IProduct{
    productId: number
    productName: String
    productCode: String
    releaseDate: String
    description: String
    price: number
    starRating: number
    imageUrl: String
}

/* Defines the product entity */
export interface Product {
    id: number | null;
    productName: string;
    productCode: string;
    description: string;
    starRating: number;
}