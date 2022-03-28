import { useState } from "react";
import UseCart from "../../hooks/cartHook";

interface FormProps{
    className?: string;
}

export default function CheckoutForm(props: FormProps){
    const [customer, updateCustomer] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postCode: "",
        email: "",
        phone: ""
    })
    
    const wrapperClass="flex flex-col"
    const labelClass="pt-1 text-white font-light tracking-wide"
    const inputClass="rounded p-1"

    return (
        <form className={`flex flex-grow flex-col`}>
            <h1 className="p-2 rounded-t tracking-wider font-light text-2xl text-white bg-white bg-opacity-50">Shipping Information</h1>
            <div className={props.className}>
                <div className={`grid grid-cols-2 gap-2 `}>
                    <div className={wrapperClass}>
                        <label className={labelClass} htmlFor="firstName">Fornavn:</label>
                        <input className={inputClass} 
                            name="firstName" 
                            type="text" 
                            onChange={(event) => updateCustomer({...customer, firstName: event.target.value}) }/>
                    </div>
                    <div className={wrapperClass}>
                        <label className={labelClass} htmlFor="lastName">Efternavn:</label>
                        <input className={inputClass} 
                            name="lastName" 
                            type="text"
                            onChange={(event) => updateCustomer({...customer, lastName: event.target.value}) }/>
                    </div>
                </div>
                <div className={wrapperClass}>
                    <label className={labelClass} htmlFor="email">Email:</label>
                    <input className={inputClass} 
                        name="email" 
                        type="email"
                        onChange={(event) => updateCustomer({...customer, email: event.target.value})}/>
                </div>
                
                <br/>
            
                <div className={wrapperClass}>
                    <label className={labelClass} htmlFor="address">Addresse:</label>
                    <input className={inputClass} 
                        name="address" 
                        type="text"
                        onChange={(event) => updateCustomer({...customer, address: event.target.value})}/>
                </div>

                <div className="grid grid-cols-4 gap-2">
                    <div className={`col-span-3 ${wrapperClass}`}>
                        <label className={labelClass} htmlFor="city">By:</label>
                        <input className={inputClass} 
                            name="city" 
                            type="text"
                            onChange={(event) => updateCustomer({...customer, city: event.target.value}) }/>

                    </div>
                    <div className={wrapperClass}>
                        <label className={labelClass} htmlFor="postCode">Postnummer:</label>
                        <input className={inputClass} 
                            name="postCode" 
                            type="text"
                            onChange={(event) => updateCustomer({...customer, postCode: event.target.value}) }/>
                    </div>
                </div>
            </div>
        </form>
    )
}