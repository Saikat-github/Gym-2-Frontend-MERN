import { ArrowRight, Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const RazorpayPayment = ({ plan, email, name, navigateTo, dayPassData }) => {
  const { getUserProfile, backendUrl, axiosInstance } = useContext(AuthContext);
  const [loader, setLoader] = useState(false)

  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      setLoader(true);
      // Step 1: Create order
      const orderResult = await axiosInstance.post("/api/user/create-order", { planId: plan._id, dayPassData })
      const { orderId, key, currency, amount } = orderResult.data;

      if (orderResult.data.success) {
        // Step 2: Initialize Razorpay
        const options = {
          key,
          amount: amount * 100,
          currency,
          name: 'Minimalist Gyms',
          description: `${plan.title} Membership`,
          order_id: orderId,
          notify: {
            email: true // Email notifications to customer
          },
          handler: async (response) => {
            try {
              // Step 3: Verify payment
              const verificationResult = await axiosInstance.post("/api/user/verify-order", response);

              if (verificationResult.data.success) {
                toast.success('Payment successful!');
                await getUserProfile();
                navigate(navigateTo)
              }
            } catch (error) {
              console.error('Payment verification failed:', error);
              toast.error('Payment verification failed!');
              setLoader(false); // Set loader off on failure
            }
          },
          prefill: {
            name: name || 'Customer',
            email: email || 'customer@example.com',
          },
          theme: {
            color: '#3399cc',
          },
          modal: {
            ondismiss: () => {
              // ✅ Reset loader if user closes Razorpay without paying
              setLoader(false);
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        toast.error(orderResult.data.message);
        setLoader(false)
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to create order!');
      setLoader(false)
    } 
  };



  return (
    <div className="flex justify-center items-center min-h-[90vh] py-24 px-2">
      <button
        disabled={loader}
        onClick={() => handlePayment()}
        className={`border border-white/20 shadow-xl shadow-white/10  my-10 py-2 rounded-full flex items-center gap-2 px-4 hover:gap-4 transition-all duration-200 ${loader ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
      >
        Pay ₹{dayPassData?.noOfDays ? (plan.price * dayPassData.noOfDays) : plan.price} securely for {plan.title} plan {loader ? <Loader2 className="animate-spin w-4" /> : <ArrowRight className="w-5 h-5"/>}
      </button>
    </div>
  );
}

export default RazorpayPayment