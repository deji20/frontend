import UseCart from "../../hooks/cartHook";
import { ProductModel } from "../../models/models";
import ProductLine from "../products/productLine";

interface OverviewProps{
    products: {
        amount: number;
        product: ProductModel
    }[]
    className?: string;
}

export default function CartOverview(props: OverviewProps){
    const {cart, setCart} = UseCart();

    return (
        <div className={" " + props.className}>
            <ul className="bg-black bg-opacity-60 p-4 max-h-[90vh] flex flex-col flex-wrap rounded-t-xl shadow-2xl">
                {props.products?.map((line, i) => {
                    return (
                        <ProductLine 
                            className="p-2"
                            key={i} 
                            product={line.product} 
                            amount={line.amount}
                            onDelete={(product) => {
                                if(cart){ 
                                    cart.products = cart.products?.filter((cartProd) => cartProd.id != product.id);
                                    setCart(cart);
                                }
                            }}
                        />)
                    })}
            </ul>
            <div className="bg-black rounded-b-xl flex tracking-wide justify-between p-2 text-white bg-opacity-25 ">
                <p className="">Total:</p>
                <p className="">{props.products.reduce<number>((prev, cur) => prev += cur.product.price, 0)}<sub>kr</sub></p>
            </div>
        </div>
    )
}
