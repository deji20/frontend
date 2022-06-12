import { useState } from "react";
import UseCart from "../../hooks/cartHook";
import { Customer } from "../../models/models";
import NumberInput from "../input/numberInput";

interface FormProps{
    className?: string;
    customer?: Customer;

    onSubmit?: () => void;
    onChange?: (customer: Customer) => void; 
}

export default function CustomerForm(props: FormProps){
    const [customer, updateCustomer] = useState<Customer>(props.customer || {
        privatePerson:{
            firstName: "",
            lastName: "",
        },
        shippingAddress: {
            addressLine1: "",
            addressLine2: "",
            city: "",
            country: "DNK",
            postalCode: ""
        },
        email: "",
        phone: {
            prefix: "+45",
            number: "",
        }
    })
    
    const wrapperClass="flex flex-col"
    const labelClass="pt-1 text-white font-light tracking-wide"
    const inputClass="rounded p-1"

    return (
        <form>
            <div className={`${props.className}`}>
                <h1 className="p-2 rounded-t tracking-wider font-light text-2xl shadow-2xl text-white bg-black bg-opacity-70">Shipping Information</h1>
                <div className=" gap-5 p-5 bg-black bg-opacity-50 rounded-b-xl shadow-2xl">
                    <div className={`grid grid-cols-2 gap-3`}>
                        <div className={wrapperClass}>
                            <label className={labelClass} htmlFor="firstName">Fornavn:</label>
                            <input className={inputClass} 
                                name="firstName" 
                                type="text"
                                value={customer.privatePerson.firstName}
                                onChange={(event) => {
                                    const newCustomer = {...customer, privatePerson: {...customer.privatePerson, firstName: event.target.value}}; 
                                    updateCustomer(newCustomer)
                                    props.onChange && props.onChange(newCustomer);
                                }}/>
                        </div>
                        <div className={wrapperClass}>
                            <label className={labelClass} htmlFor="lastName">Efternavn:</label>
                            <input className={inputClass} 
                                name="lastName" 
                                type="text"
                                value={customer.privatePerson.lastName}
                                onChange={(event) => {
                                    const newCustomer = {...customer, privatePerson: {...customer.privatePerson, lastName: event.target.value}}; 
                                    updateCustomer(newCustomer)
                                    props.onChange && props.onChange(newCustomer);
                                }}/>
                        </div>
                    </div>
                    
                    <div className={wrapperClass}>
                        <label className={labelClass} htmlFor="email">Email:</label>
                        <input className={inputClass} 
                            name="email" 
                            type="email"
                            value={customer.email}
                            onChange={(event) => {
                                const newCustomer = {...customer, email: event.target.value};
                                updateCustomer(newCustomer);
                                props.onChange && props.onChange(newCustomer);
                                }}/>
                    </div>

                    <div className={wrapperClass}>
                        <label className={labelClass}>Telefon:</label>
                        <div className="flex flex-row">
                            <input className={`${inputClass} rounded-r-none w-12 text-center`}  
                                type="text"
                                maxLength={4}
                                value={customer.phone.prefix}
                                onChange={(event) => {
                                    const newCustomer = {...customer, phone: {...customer.phone, number: event.target.value}}
                                    updateCustomer(newCustomer)
                                    props.onChange && props.onChange(newCustomer);
                                }}/>
                            <NumberInput 
                                className={`${inputClass} rounded-l-none border-l-black`} 
                                onChange={(value) => {
                                    const newCustomer = {...customer, phone: {...customer.phone, number: value.toString()}}
                                    updateCustomer(newCustomer)
                                    props.onChange && props.onChange(newCustomer);
                                }}/>
                        </div>
                    </div>

                    <br/><div className="h-[1px] w-full bg-white rounded-full bg-opacity-15"></div><br/>
                
                    <div className={wrapperClass}>
                        <label className={labelClass} htmlFor="address">Addresse:</label>
                        <input className={inputClass} 
                            name="address" 
                            type="text"
                            value={customer.shippingAddress.addressLine1}
                            onChange={(event) => {
                                const newCustomer = {...customer, shippingAddress: {...customer.shippingAddress, addressLine1: event.target.value}}
                                updateCustomer(newCustomer);
                                props.onChange && props.onChange(newCustomer);
                                }}/>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                        <div className={`col-span-3 ${wrapperClass}`}>
                            <label className={labelClass} htmlFor="city">By:</label>
                            <input className={inputClass} 
                                name="city" 
                                type="text"
                                value={customer.shippingAddress.city}
                                onChange={(event) => {
                                    const newCustomer = {...customer, shippingAddress: {...customer.shippingAddress, city: event.target.value}}
                                    updateCustomer(newCustomer)
                                    props.onChange && props.onChange(newCustomer);
                                    }}/>

                        </div>
                        <div className={wrapperClass}>
                            <label className={labelClass} htmlFor="postCode">Postnummer:</label>
                            <input className={inputClass} 
                                name="postCode" 
                                type="text"
                                value={customer.shippingAddress.postalCode}
                                onChange={(event) => {
                                    const newCustomer = {...customer, shippingAddress: {...customer.shippingAddress, postalCode: event.target.value}};
                                    updateCustomer(newCustomer);
                                    props.onChange && props.onChange(newCustomer);
                                }}/>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}