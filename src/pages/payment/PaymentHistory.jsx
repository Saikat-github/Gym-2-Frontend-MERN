import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { PaymentHistoryCard, PaymentSkeleton } from '../../components';
import axios from 'axios';
import { toast } from 'react-toastify';




const PaymentHistory = () => {
  const [cursor, setCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loader, setLoader] = useState(false);
  const [payments, setPayments] = useState([])
  const { backendUrl, profileData, axiosInstance } = useContext(AuthContext);


  useEffect(() => {
    fetchPayments()
  }, [])



  const fetchPayments = async () => {
    try {
      setLoader(true);
      const res = await axiosInstance.get("/api/user/get-allpayments", { params: { cursor }})

      if (res.data.success) {
        setPayments([...payments, ...res.data.data]);
        setCursor(res.data.nextCursor);
        setHasNextPage(res.data.hasNextPage);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    } finally {
      setLoader(false)
    }
  }



  return (
    <div className="py-24">
      <h1 className='text-center text-3xl font-semibold'>Payment History</h1>
        <div className="max-w-5xl mx-auto p-4 space-y-6">
          {
            payments?.length === 0 && !loader ? (
              <div className="text-center text-gray-500">
                No membership history found.
              </div>
            )
              :
              payments?.map((membership, index) => (
                <PaymentHistoryCard
                  key={index}
                  membership={membership}
                  name={profileData?.personalInfo?.name}
                />
              ))
          }
        {
          loader && <PaymentSkeleton />
        }
        {hasNextPage && payments.length > 0 && (
          <button
            disabled={loader}
            onClick={fetchPayments}
            className={`block mx-auto mt-4 px-4 py-1 bg-white/10 text-white rounded-full shadow-md hover:bg-white/10 border border-white/15 transition cursor-pointer hover:opacity-80`}
          >
            Load More...
          </button>
        )}
      </div>
    </div>

  )
}

export default PaymentHistory