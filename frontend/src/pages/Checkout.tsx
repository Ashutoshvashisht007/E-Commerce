import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe('pk_test_51OZbvDSHrAejoqryc7cFJB2vvakp0dAVLCQdoEvpbBCACqmyTZuhm51Cum17xeK8trJStPmhL94yWuO1hVUWd4Ot00WrthjWSQ');

const CheckOutForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [isProcessing,setIsProcessing] = useState<boolean>(false);

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!stripe || !elements)
        {
            return;
        }

        setIsProcessing(true);

        const order = {

        };

        const {paymentIntent, error} = await stripe.confirmPayment({
            elements, 
            confirmParams:{
                return_url: window.location.origin
            },
            redirect: "if_required",
        });

        if(error)
        {
            setIsProcessing(false);
            return toast.error(error.message || "Something Went Wrong");
        }

        if(paymentIntent.status === "succeeded")
        {
            console.log("Placing Order");
            navigate("/orders");
        }
        setIsProcessing(false);
    };

    return <div className="checkout-container">
        <form onSubmit={submitHandler}>
            <PaymentElement/>
            <button>
                {
                    isProcessing ? "Processing..." : "Pay"
                }
            </button>
        </form>
    </div>;
}

const Checkout = () => {
  return (
    <Elements options={{clientSecret: "pi_3OeFoySHrAejoqry0yZkrQS9_secret_ykUDNFEBrkaZjtZSrdDvpFAuw"}} stripe={stripePromise}>
        <CheckOutForm/>
    </Elements>
  )
}

export default Checkout;