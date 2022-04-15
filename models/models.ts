export interface Customer{
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    postCode: string,
    email: string,
    phone: string
}

export interface Order{
    products: {
        product: string| ProductModel,
        amount: number,
    }[];
} 

export interface ProductModel{
    _id: string,
    price: number,
    name: string,
    categories: string[],
    version: Version[]
}

export interface Version{
    pictures: Picture[];
    description: string;
    amount: number;
}

export interface Picture{
    id?: string,
    ratio: {
        x: number, 
        y: number
    }, 
    path: string,
    alt: string,
    mime: string,
}

export interface CartModel{
    products: {
        id:string,
        amount:number,
    }[];
}