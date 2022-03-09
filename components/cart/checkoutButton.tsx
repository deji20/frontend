import React, { useEffect, useState } from "react";
import UseCheckout from "../../hooks/useCheckout";
import OffsetButton from "../utilityComponent/offsetButton";

interface CheckoutProps{
  productIds: string[];
}

export default function CheckoutButton(props: CheckoutProps){
  //loads NETS checkout script into dom 
  const check = UseCheckout(props.productIds, "checkout");
  const [visible, isVisible] = useState(false)

  const checkout = async () => {
    if(check){
      check({
        complete: (response) => {console.log(response); isVisible(false)}
      });
      isVisible(true);
    }
  }

  return(
    <React.Fragment>
      <div className={`fixed z-10 top-0 left-0 align-middle justify-center h-screen w-screen pt-14 overflow-y-scroll ${visible ? "flex" : "hidden"}`}>
        <div className="w-5/6 h-5/6">
          <div id="checkout"/>
        </div>
      </div>
      <OffsetButton onClick={checkout} className="bg-green-600 hover:bg-green-800">
        <p>Check Out</p>
      </OffsetButton>
    </React.Fragment>
  )
}