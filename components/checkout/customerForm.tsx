import { useState } from "react";
import UseCart from "../../hooks/cartHook";
import { Customer } from "../../models/models";

interface FormProps{
    className?: string;
    customer?: Customer;
    onSubmit?: () => void;
    onChange?: (customer: Customer) => void; 
}

export default function CustomerForm(props: FormProps){
    const [customer, updateCustomer] = useState(props.customer || {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postCode: "",
        email: "",
        phone: ""
    } as Customer)
    
    const wrapperClass="flex flex-col"
    const labelClass="pt-1 text-white font-light tracking-wide"
    const inputClass="rounded p-1"

    return (
        <div className={`${props.className}`}>
            <h1 className="p-2 rounded-t tracking-wider font-light text-2xl shadow-2xl text-white bg-black bg-opacity-70">Shipping Information</h1>
            <div className=" gap-5 p-5 bg-black bg-opacity-50 rounded-b-xl shadow-2xl">
                <div className={`grid grid-cols-2 gap-3`}>
                    <div className={wrapperClass}>
                        <label className={labelClass} htmlFor="firstName">Fornavn:</label>
                        <input className={inputClass} 
                            name="firstName" 
                            type="text" 
                            onChange={(event) => {
                                updateCustomer({...customer, firstName: event.target.value}); 
                                props.onChange && props.onChange(customer) 
                            }}/>
                    </div>
                    <div className={wrapperClass}>
                        <label className={labelClass} htmlFor="lastName">Efternavn:</label>
                        <input className={inputClass} 
                            name="lastName" 
                            type="text"
                            onChange={(event) => {
                                updateCustomer({...customer, lastName: event.target.value}); 
                                props.onChange && props.onChange(customer);
                            }}/>
                    </div>
                </div>
                <div className={wrapperClass}>
                    <label className={labelClass} htmlFor="email">Email:</label>
                    <input className={inputClass} 
                        name="email" 
                        type="email"
                        onChange={(event) => {
                            updateCustomer({...customer, email: event.target.value});
                            props.onChange && props.onChange(customer);
                            }}/>
                </div>
                
                <br/>
            
                <div className={wrapperClass}>
                    <label className={labelClass} htmlFor="address">Addresse:</label>
                    <input className={inputClass} 
                        name="address" 
                        type="text"
                        onChange={(event) => updateCustomer({...customer, address: event.target.value})}/>
                </div>

                <div className="grid grid-cols-4 gap-3">
                    <div className={`col-span-3 ${wrapperClass}`}>
                        <label className={labelClass} htmlFor="city">By:</label>
                        <input className={inputClass} 
                            name="city" 
                            type="text"
                            onChange={(event) => {
                                updateCustomer({...customer, city: event.target.value});
                                props.onChange && props.onChange(customer);
                                } }/>

                    </div>
                    <div className={wrapperClass}>
                        <label className={labelClass} htmlFor="postCode">Postnummer:</label>
                        <input className={inputClass} 
                            name="postCode" 
                            type="text"
                            onChange={(event) => {
                                updateCustomer({...customer, postCode: event.target.value});
                                props.onChange && props.onChange(customer);
                            }}/>
                    </div>
                </div>
            </div>
        </div>
    )
}