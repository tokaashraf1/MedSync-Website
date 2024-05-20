import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { PatientContext } from '../../../Contexts/MedicalRecordContext'
import Loading from '../../../Components/Loading/Loading'
import API_ENDPOINT from '../../../utils/constants';
import {specialties} from "../../../utils/Data"
import axios from 'axios'

function HistorySection() {
  const {Userhistory,patientId}=useContext(PatientContext)
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [medicalSpeciality, setmedicalSpeciality] = useState(null);
  const [Diagnosis, setDiagnosis] = useState(null);
  const [LabTests, setLabTests] = useState(null);
  const [MedicationName, setMedicationName] = useState(null);
  const [popup, setPopup] = useState(false);
  const [token, settoken] = useState();
  const [loading, setLoading] = useState(false); 
  const [specialtiesOption, setSpecialtiesOption] = useState("");
  // const openPdfInNewWindow = () => {
  //   const pdfUrl = 'http://localhost:8000/storage/medical-history-files/e0328f7f-c0be-4ebf-8cd3-4a80b8e63ffa_Midterm 2023updated.pdf';
  //   window.open(pdfUrl, '_blank');
  // };
  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    settoken(authToken);
  }, []);

  const handleAddClinic = async () => {
    try {
      setLoading(true);
      const postData = {
        medical_speciality_english:medicalSpeciality,
        diagnosis_name:Diagnosis,
        lab_tests: LabTests,
        medication_name: MedicationName,
      };

      // Make the POST request using Axios
      const response = await axios.post(`${API_ENDPOINT}/api/doctor/add-record/${patientId}`,postData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      console.log('Response:', response.data);
      window.location.href="/approvedreqs"
    } catch (error) {
      // Handle errors if the request fails
      console.error('Error adding clinic:', error);
      setLoading(false); 
    }
  };  

  return (
    //   <div>
    //       {Userhistory&&Userhistory["Speciality Filters"] && (

    //     <div className=''>
    //       <div className='col-12  '>
    //         <p className='fs-4  text-black'>Dermatology</p>
    //         <p className='fs-6 text-gray '>kkkkkkkkkk</p>
    //         <p className='fs-6 text-gray'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cumque aspernatur o</p>
    //         <hr className='me-5 text-black' />
    //       </div>
    //     </div>
    // )}
    //   </div>

    <div>
      <div>
        {/* Select dropdown for filters */}
        <div className="position-relative">
          <select
            className=" mb-3 me-5 p-1 rounded-3   position-absolute end-0"
            value={selectedFilter}
            onChange={handleFilterChange}
          >
            {Userhistory &&
              Userhistory["Speciality Filters"] &&
              Userhistory["Speciality Filters"].map((filter) => (
                <option key={filter.english_name} value={filter.english_name}>
                  {filter.english_name}
                </option>
              ))}
          </select>
        </div>

        {/* Display records based on the selected filter */}
        {Userhistory && Userhistory.data && (
          <div>
            {Userhistory.data.map((record) => {
              const englishName = record["Medical Speciality"][0]?.english_name;
              const medications = record.medications
                .map((med) => med.name)
                .join(", ");
              const diagnoses = record.diagnoses
                .map((diagnosis) => diagnosis.name)
                .join(", ");
              const labTests = record["Lab Tests"]
                .map((test) => test.english_name)
                .join(", ");
              const files = record.Files.map((file) => (
                <a
                  key={file}
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {file.split("/").pop()} {/* Display the filename */}
                </a>
              ));

              const filterMatch =
                selectedFilter === "All" || selectedFilter === englishName;

              return (
                filterMatch && (
                  <div key={record.id} className="">
                    <div className="col-12">
                      <p className="fs-4 text-black">{englishName}</p>
                      <p className="fs-6 text-gray">
                        Medications: {medications}
                      </p>
                      <p className="fs-6 text-gray">Diagnoses: {diagnoses}</p>
                      <p className="fs-6 text-gray">Lab Tests: {labTests}</p>
                      <p className="fs-6 text-gray">Files:</p>
                      <ul>
                        {files.map((file, index) => (
                          <li key={index} className="bg-white border-0 ">
                            <button
                              className="bg-white border-0 text-blue "
                              onClick={() =>
                                window.open(record.Files[index], "_blank")
                              }
                            >
                              Document {index + 1}
                            </button>
                          </li>
                        ))}
                      </ul>
                      <hr className="me-5 text-black" />
                    </div>
                  </div>
                )
              );
            })}
          </div>
        )}
      </div>

      {Userhistory && Userhistory.data && !popup ? (
        <button
          className="border-0 p-1 active-button rounded-2"
          onClick={() => setPopup(true)}
        >
          Add Medical History +
        </button>
      ) : null}
      {popup && (
        <div className="add-medical-history">
          <div className="mt-4">
            <lable className=" text-black d-block ">medical Speciality:</lable>
            {/* <input type="text" className='mt-2 form-control' value={medicalSpeciality} onChange={(e) => setmedicalSpeciality(e.target.value)}/> */}
            <select
              value={specialtiesOption}
              onChange={(e) => setSpecialtiesOption(e.target.value)}
              className="form-control mt-1">
              <option className="empty-option" value="">
                Choose Medical Speciality
              </option>
              {specialties.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-2">
            <lable className=" text-black d-block ">Diagnosis:</lable>
            <input
              type="text"
              className="mt-2 form-control"
              value={Diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <lable className=" text-black d-block ">Lab Tests:</lable>
            <input
              type="text"
              className="mt-2 form-control"
              value={LabTests}
              onChange={(e) => setLabTests(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <lable className=" text-black d-block ">Medication Name:</lable>
            <input
              type="text"
              className="mt-2 form-control"
              value={MedicationName}
              onChange={(e) => setMedicationName(e.target.value)}
            />
          </div>
          <div className="popup-btns me-5 mt-4 d-flex justify-content-end">
            <button className="me-3 active-button" onClick={handleAddClinic}>
              Add +
            </button>
            <button className="delete-cancel" onClick={() => setPopup(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
      {loading && <Loading />}
    </div>
  );
}

export default HistorySection