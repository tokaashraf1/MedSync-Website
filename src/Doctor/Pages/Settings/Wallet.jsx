import React, { useContext, useState } from 'react'
import Calendar from 'react-calendar'
import API_ENDPOINT from "../../../utils/constants";
import { ToastContainer, toast } from 'react-toastify';
import { SettingsContext } from "../../../Contexts/SettingProvider";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
function Wallet() {
  const[cardNumber,setCardNumber]=useState()
  const[cardholdername,setcardholdername]=useState()
  const[expirationDate,setexpirationDate]=useState()
  const { token , balanceResponse,pendingResponse,transferedResponse } = useContext(SettingsContext);
  const [loading, setLoading] = useState(false);
  const[cvv,setcvv]=useState()
  const handleAddCardNumber = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const data = {
        card_number: cardNumber,
        card_holder_name: cardholdername,
        expiration_date: expirationDate,
        cvv: cvv,
      };
      const response = await axios.post(
        `${API_ENDPOINT}/api/doctor/wallet/add-wallet`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      setLoading(false);
      toast.success(' Card Info added successfully', {
        position: "bottom-right",
        autoClose: 4000,
        });
      // window.location.href="/home"
    } catch (error) {
      setLoading(false);
      toast.error(' Please fill in all fields!', {
        position: "bottom-right",
        autoClose: 4000,  
        });
    }
  };

  return (
    <div className="">
      <div className=" row doctor-cards-con">
        <div className=" row col-md-9 col-12  rounded-5 ">
          <div className="col-md-4  ">
            <div className="card text-center doctor-cards  ">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <p className="fs-3"> {pendingResponse ? pendingResponse : "00:00"}</p>
                <p className="card-text mt-2">Pending Balance</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center doctor-cards  ">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <p className="fs-3"> {balanceResponse ? balanceResponse : "0:00"}</p>
                <p className="card-text mt-2">Current Balance</p>
              </div>
            </div>
          </div>
          <div className="col-md-4  ">
            <div className="card text-center doctor-cards  ">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <p className="fs-3">{transferedResponse? transferedResponse : "0:00"}</p>
                <p className="card-text mt-2">Transferred Balance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" credit-info bg-white shadow mt-5  rounded-5 ">
        <div className="mt-4 ms-5">
          <p className="fs-3 credit-info-p">Credit Information</p>
          <label className="d-block fs-6 mt-4">Card  Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="form-control mt-1"/>

          <label className="d-block fs-6 mt-2">Cardholder Name</label>
          <input
            type="text"
            value={cardholdername}
            onChange={(e) => setcardholdername(e.target.value)}
            className="form-control mt-1"/>

          <label className="d-block fs-6 mt-2">Expiration Date</label>
          <input
            type="text"
            value={expirationDate}
            onChange={(e) => setexpirationDate(e.target.value)}
            className="form-control mt-1"/>

          <label className="d-block fs-6 mt-2">CVV</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setcvv(e.target.value)}
            className="form-control mt-1"/>
            <div className="popup-btns me-5 mt-5 d-flex justify-content-end">
          <button onClick={handleAddCardNumber} className="active-button px-3 py-1 rounded-4 me-3">
            Add
          </button>
        </div>
        </div>
      </div>
      {loading && (
        <div className="loading-popup">
          <div class="load"></div>
        </div>
      )}
    </div>
  );
}

export default Wallet