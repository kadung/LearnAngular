/* Defines the product entity */
export interface Product{
    id: number | null;
    productName: String
    productCode: String
    releaseDate: String
    description: String
    price: number
    starRating: number
    imageUrl: String
}