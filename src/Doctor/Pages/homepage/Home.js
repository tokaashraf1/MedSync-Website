import React from 'react'
import "./Home.css"
import  { useState, useEffect } from 'react';
import Sidebar from '../../../Components/SideBar/SideBar';
import Footer from '../../../Components/Footer/Footer';
import Calendar from 'react-calendar'
// import 'react-calendar/dist/Calendar.css';
import doctorhome from "../../../assets/imgs/doctorhome.svg"
import axios from 'axios';
import API_ENDPOINT from '../../../utils/constants';
import Header from "../../../Components/Header/header"

function Home() {

  document.body.classList.add("home-body");
  const[userName,setUserName]=useState('')
  document.body.classList.add("doctors-q-body");
  const [ispopup, setIspopup] = useState(false);
  const [username, setUsername] = useState(false);
  const [profileimg, setprofileimg] = useState();
  const [token, settoken] = useState();
  const [regions, setRegions] = useState([]);
  const [shouldRenderRegions, setShouldRenderRegions] = useState(false);
  const [street, setStreet] = useState('');
  const [description, setDescription] = useState('');
  const [workDays, setWorkDays] = useState('');
  const [loading, setLoading] = useState(false); 

  //this will prevent an athunticated users 


  // useEffect(() => {
  //   var authToken = localStorage.getItem('authToken');
  //   if (authToken !== undefined || authToken !== null || authToken !== '') {
  //     // If authToken exists, do something with it
  //   window.location.href="/"
  //   }
  // }, []); 
const governorate=["Cairo","Giza"]
  const gizaenglishRegions = [
    "October",
    "October Gardens",
    "Sheikh Zayed",
    "Agoza",
    "Mohandseen",
    "Dokki",
    "Bhoos",
    "Abu Rawash",
    "Imbaba",
    "Kit Kat",
    "Ard El Lewa",
    "Al-Warraq",
    "Bulaq Dakror",
    "Meet Okba",
    "Giza district",
    "Giza Center",
    "Pyramid",
    "Mariouteya",
    "Tersa",
    "Faisal",
    "Al-Munib",
    "The Pyramid gardens",
    "Awseem",
    "Al-Badrasheen",
    "Barajil",
    "Hawamdiya",
    "Remaia",
    "Sahfeen",
    "El Saaf",
    "Aziziyya",
    "Umrania",
    "Ayat",
    "Mansouriya",
    "Bashtil",
    "Dahab Island",
    "Dahshur",
    "Saft",
    "Sumed",
    "Kardasa",
    "Kafr Tohormos",
    "Nahya",
  ];
  const cairoenglishRegions = [
    'downtown',
    'Zamalek',
    'Abbasiya',
    'El Nozha',
    'Nasr City',
    'New Cairo',
    'New Heliopolis',
    'Badr',
    'Al Abour',
    'Al Shorouk',
    'Madinaty',
    '10th of Ramadan city',
    'Banha City',
    'New Administrative Capital',
    'The First Settlement',
    'The 3th Settlement',
    'The 5th Settlement',
    'El Basatin',
    'Al-Tabin',
    'Al-Tunisia',
    'Al Jazeera',
    'El-Gamaleya',
    'ELHussein',
    'Al-Helmiya',
    'Al-Helmiya Algdida',
    'Caligh Al-Maamun',
    'Al-Darb Al-Ahmar',
    'Duwaiqa',
    'El Zawya El Hamraa',
    'El Zaitoun',
    'El Sahel',
    'Shubra',
    'Sharabiya',
    'Rod El-Farag',
    'As-Salam',
    'Al Sayeda Zeinab',
    'El Sagha',
    'Fajjala',
    'Katameya',
    'lotus',
    'Al Marj',
    'South Investors Area',
    'North Investors Area',
    'El Matariyya',
    'El Mokattam',
    'Al-Mounira',
    'New Mounira',
    'Musky',
    'Al-Waili',
    'Bab El Sharia',
    'Bab Al-Luq',
    'Bulaq Abu Al-Ela',
    'Sakanat El Maadi',
    'Maadi Gardens',
    'Maadi',
    'garden City',
    'Rhoda Island',
    'Geser El-Swies',
    'Al Safarat',
    'Kobba Gardens',
    'Al-Khalifa District',
    'Dar AISalaam',
    'Saray Al-Qubba',
    'Abdeen',
    'Abboud',
    'Kasr Al-Nile',
    'kotsika',
    'El-Banafseg',
    'Al Rehab',
    'Al Narges',
    'El yasmine',
    // 'Nasr City',
    'Sheraton Airport Residences',
    'Heliopolis',
    'Ancient Egypt',
    'Mansheyat Nasser',
  ];

  const [selectedGovernorate, setSelectedGovernorate] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const region = selectedGovernorate === 'Cairo' ? cairoenglishRegions : 
                  selectedGovernorate === 'Giza' ? gizaenglishRegions : [];

  const handleGovernorateChange = (e) => {
    setSelectedGovernorate(e.target.value);
    setSelectedRegion('');
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };



  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    settoken(authToken);
  }, []); // This useEffect runs only once on component mount

  useEffect(() => {
    console.log(token); // Log the updated value of token
  }, [token]);
  
  

  useEffect(() => {
    var loginUserName = localStorage.getItem('loginUserName');
    var profileimg = localStorage.getItem('profileimg');
    setUsername(loginUserName)
    setprofileimg(profileimg)
  
  }, []); 

  const addClinicButtonClick = () => {
    setIspopup(true);
  };


  


  
      const [data, setData] = useState(null);

  useEffect(() => {
    const apiUrl = `${API_ENDPOINT}/api/doctor/get/workplaces`;
    const fetchData = async () => {
      // Check if API_TOKEN exists before making the API request
      if (!token) {
        console.error('API token is missing!');
        return; // Exit early if token is missing
      }

      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });

        setRegions(response.data.workplaces);
        console.log("kkkkkkkkkkkk")
        setShouldRenderRegions(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]); 
  
  const handleAddClinic = async () => {
    try {
      setLoading(true);
      const postData = {
        region:selectedRegion,
        country:selectedGovernorate,
        street: street,
        description: description,
        work_days: workDays, // Example work days
      };

      // Make the POST request using Axios
      const response = await axios.post(`${API_ENDPOINT}/api/doctor/add/workplace`,postData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      console.log('Response:', response.data);
      window.location.href="/home"
    } catch (error) {
      // Handle errors if the request fails
      console.error('Error adding clinic:', error);
      setLoading(false); 
    }
  };  


  return (
    <div>
<Header initialScrolled ={true} initialEnableScroll ={false} page="doctor" />
<div className="row sec1-con">
{/* <div className='clincs-name row'>
  <div className='col-3'>nasr city clinic</div>
  <div className='col-3'>b</div>
</div> */}

<div>
    
      {/* Conditionally render regions based on shouldRenderRegions state */}
      {shouldRenderRegions && regions && regions.length > 0 && (
  <div className='clincs-name row'>
    {regions.map((region, index) => (
      <div key={index} className='col-3'>
        {region.region.english_name} clinic
      </div>
    ))}
  </div>
)}
    </div>

  <div className="col-md-8 welcome-section order-md-1 order-1" >

<div className='welcome-section-txt'>
<div className='row'>
      <h1 style={{color:"white"}} className='with-line col-8 '>Welcome Dr.{username}</h1>
      <img className='col-3 d-none d-md-block' src={doctorhome } /> 
</div>
  
</div>
  </div>
  <div className="col-md-4 d-none d-md-block order-md-2 "> 
  <Calendar   />
  </div>

    <div className="col-md-8 clinic-section order-md-3 order-4">

      <div className="row mt-5 ms-1">
      <div className="col-lg-6 patient-list-sec">
        <h1>Patient list</h1>

<div className='mt-4'>
  {/* but here over flow hidden */}
  <div className="row " >
    <img src="https://ui-avatars.com/api/?name=T+A&color=7F9CF5&background=EBF4FF" alt="" className='col-6'  />
    <p className='col-6'>No patients to display </p>
  </div>
</div>
<div className="row mt-1">
  <img src="https://ui-avatars.com/api/?name=T+A&color=7F9CF5&background=EBF4FF" alt="" className='col-6'  />
  <p className='col-6'>No patients to display</p>
</div>
<div className="row mt-1">
  <img src="https://ui-avatars.com/api/?name=T+A&color=7F9CF5&background=EBF4FF" alt="" className='col-6'  />
  <p className='col-6'>No patients to display </p>
</div>
<div className="row mt-1">
  <img src="https://ui-avatars.com/api/?name=T+A&color=7F9CF5&background=EBF4FF" alt="" className='col-6'  />
  <p className='col-6'>No patients to display </p>
</div>
<div className=" mt-5 add-clinc-button">
<button onClick={addClinicButtonClick}>Add Clinc +</button>
</div>

</div>
  <div className="col-lg-6 add-clinc-sec ">
<h1>consultation</h1>
<div className='mt-4 add-clinc-sec-content'>
<div className="row mt-4 ms-1 ">
  <img src="https://ui-avatars.com/api/?name=T+A&color=7F9CF5&background=EBF4FF" alt="" className='col-6'  />
  <p className='col-6'>No patients to display</p>


    {/* <hr style={{color:"var(--blue)"}} /> */}

</div>
<div className='cons-info mt-3'>

</div>
<div className='mt-3 cons-info-p'>
<p>Last Checked:No patients to display </p>
<p>observation:No patients to display</p>
<p>Prescription:No patients to display</p>
</div>
</div>

</div>

      </div>
    </div>
    
    <div className="col-md-4 complete-profile order-md-4 order-3"> 
  <div className="row mt-5 ms-2">
    <div className='col-6 complete-profile-circle'>
    <div className='text-center '>
        <h1>80%</h1>
    </div>
    </div>

    <div className='col-6'>
    <p >Profile Informations</p>
    
    </div>
  
  </div>
  <div>
    <button className=' ' onClick={()=>window.location.href="/profile"}>check your profile now <i class="fa fa-arrow-right" aria-hidden="true"></i></button>
  </div>
    </div>


    {ispopup && (
  <div className="popup-container">
    <div className="text-center add-clinic-popup">
      
      <h1 className='mt-3'><i class="fa fa-hospital-o" aria-hidden="true"></i> Add Clinck</h1>
      <div className='mt-3 cons-info '></div>
    </div>
    <div className='mt-3 add-clinc-popup-content'>
    <label> Governorate:</label>
    <select value={selectedGovernorate} onChange={handleGovernorateChange} class="form-control" >
        <option value="">select Governorate</option>
        {governorate.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>

      
        <div>
          <label> Region:</label>
          <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} class="form-control">
            <option value="">select Region</option>
            {selectedGovernorate === 'Cairo' ? (
              cairoenglishRegions.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))
            ) : selectedGovernorate === 'Giza' ? (
              gizaenglishRegions.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))
            ) : null}
          </select>
        </div>
  <label htmlFor="">Street</label>
  <input type="text"  value={street} onChange={(e) => setStreet(e.target.value)} class="form-control"/>
  <label htmlFor="">description</label>
  <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} class="form-control" />
  <label htmlFor="">Work Days</label>
  <input type="text" placeholder='e.g., Tuesday, Wednesday, Thursday,' value={workDays} onChange={(e) => setWorkDays(e.target.value)} class="form-control" />



    </div>
    <div className='popup-btns me-5 mt-4 d-flex justify-content-end'>
      <button onClick={handleAddClinic} className='home-add-clinc-popup-btn me-3'  >Add+</button>
      <button onClick={() => setIspopup(false)}  className='delete-cancel'>Cancel</button>
    </div>
  </div>
)}

</div>


{loading && (
        <div className="loading-popup">
          <div class="load"></div>
        </div>
      )}

  <Sidebar/>
<Footer/>

    </div>
  )
}

export default Home