import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Table from "../../../Components/Table/Table";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../../../Components/Footer/Footer";
import "./Drugs.css";
import API_ENDPOINT from "../../../utils/constants";
import Header from "../../../Components/Header/header";
import { AdminContext } from "../../../Contexts/AdminProvider";
function Drugs() {
  const { updateFlag } = useContext(AdminContext);
  document.body.classList.add("patient-body");
  const [tableInfo, setTableInfo] = useState({
    columns: [],
    rows: [],
    filteredData: [],
    creatEndpoint: `${API_ENDPOINT}/api/admin/create/medication`,
    updateEndpoint: `${API_ENDPOINT}/api/admin/update/medication/`,
    deleteEndpoint: `${API_ENDPOINT}/api/admin/delete/medication/`,
    request: false,
    Adminrequest: false,
    location: "/drugs",
  });

  useEffect(() => {
    fetch(`${API_ENDPOINT}/api/admin/get/all/medications`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          // Extracting specific properties from the user object
          const modifiedData = data.map(({ name, id }) => ({
            name,
            id,
          }));
          setTableInfo({
            ...tableInfo,
            columns: Object.keys(modifiedData[0]),
            rows: modifiedData,
            filteredData: modifiedData,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [updateFlag]);

  const handleSearch = (filteredData) => {
    setTableInfo({
      ...tableInfo,
      filteredData: filteredData,
    });
  };

  return (
    <div>
      <Header initialScrolled={true} initialEnableScroll={false} page="admin" />

      <Sidebar />
      <Table tableInfo={tableInfo} handleSearch={handleSearch} />
      <Footer />
    </div>
  );
}

export default Drugs;
