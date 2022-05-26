export interface Customer{
    privatePerson: Person,
    email: string,
    shippingAddress: Address,
    phone: PhoneNumber
}

export interface Person{
    firstName: string
    lastName: string;
}

export interface Address{
    addressLine1: string,
    addressLine2: string,
    city: string,
    postalCode: string,
    country: string,
}

export interface PhoneNumber{
    prefix: string,
    number: string
}


export interface Order{
    products: {
        product: string | ProductModel,
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
    attributes: Attribute[]
    amount: number;
}

export interface Attribute{
    name: string,
    value: string,
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
    _id:string,
    products: {
        id:string,
        amount:number,
    }[];
}