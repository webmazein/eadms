import React, { useEffect, useMemo, useRef, useState } from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import useWebSocket from "react-use-websocket";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectDefectsByScreenNo, setDefects } from "../../redux/DefectsSlice";
import { setAllDefects, selectAllDefects } from "../../redux/AllDefectSlice"; 
import "./style.css";
import axios from "axios";
import { backendUrl, websocketUrl } from "../../config";

const Zone = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const defects = useSelector((state) => selectDefectsByScreenNo(state, id));
  const allDefects = useSelector(selectAllDefects); 
  const prevDefectsRef = useRef(defects);
  const alertTimerRef = useRef(5);
  const [today, setToday] = useState("");

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `${websocketUrl}`,
    {
      onOpen: () => console.log("WebSocket connection established"),
      onClose: () => console.log("WebSocket connection closed"),
      onError: (error) => console.error("WebSocket error:", error),
      shouldReconnect: (closeEvent) => true,
    }
  );

  // useEffect(() => {
  //   async function fetchZoneData() {
  //     try {
  //       const response = await axios.get(
  //         `${backendUrl}/zone/getZoneRecordsForToday/${id}`
  //       );
  //       if (response.data.status === 200) {
  //         const { data } = response.data;
  //         const zone = [];
  //         data.forEach((element) => {
  //           zone.push({
  //             id: element.id,
  //             defect_name: element.defect_name,
  //             defect_name_hi: element.defect_name_hi,
  //             station_name: element.station_name,
  //             screen_no: element.screen_no,
  //             operator_name: element.operator_name,
  //             updated_at: element.updated_at,
  //             count: 1,
  //             is_updated: false,
  //           });
  //         });
  //         dispatch(setDefects(zone));
  //       } else {
  //         toast.error("Failed to fetch zone records");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching zone records:", error);
  //       toast.error("Failed to fetch zone records");
  //     }
  //   }

  //   fetchZoneData();
  // }, []);

   // Fetch defects from defectController.getAllDefects
   useEffect(() => {
    async function fetchAllDefects() {
      try {
        console.log(id)
        const response = await axios.get(`${backendUrl}/defects/screenNo/${id}`);
        if (response.status === 200) {
          const { data } = response;
          console.log()
          const defectsData = []
          data.forEach((defect) => {
            defectsData.push({
              id: defect.id,
              defect_name: defect.defect_name,
              defect_name_hi: defect.defect_name_hi,
              station_name: defect.station_name,
              operator_name: defect.operator_name,
              updated_at: defect.updated_at,
              screen_no: defect.screen_no,
            })            
          });
          console.log(defectsData)
          dispatch(setAllDefects(defectsData));; // Save defects to Redux store
          
        } else {
          console.error("Failed to fetch defects");
        }
      } catch (error) {
        console.error("Error fetching defects:", error);
      }
    }

    fetchAllDefects();
  }, [id, dispatch]);

  useEffect(() => {
    if (lastMessage !== null) {
      try {
        const message = JSON.parse(lastMessage.data);
        const zoneInsertData = message?.data;

        if (zoneInsertData?.length) {
          const zone = [];
          zoneInsertData.forEach((element) => {
            zone.push({
              id: element.id,
              defect_name: element.defect_name,
              defect_name_hi: element.defect_name_hi,
              station_name: element.station_name,
              screen_no: element.screen_no,
              operator_name: element.operator_name,
              updated_at: element.updated_at,
              count: 1,
              is_updated: false,
            });
          });
          dispatch(setDefects([...defects, ...zone]));
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    if (lastMessage !== null) {
      try {
        const message = JSON.parse(lastMessage.data);
        if (message.timer) {
          alertTimerRef.current = message.timer;
          sessionStorage.setItem("alert_timer", message.timer);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    const fetchAlertTimer = async () => {
      try {
        const response = await axios.get(`${backendUrl}/settings/alert_timer`);
        if (response.status === 200) {
          alertTimerRef.current = response.data.alert_timer;
          sessionStorage.setItem("alert_timer", response.data.alert_timer);
        } else {
          toast.error("Failed to fetch alert timer value");
        }
      } catch (error) {
        console.error("Error fetching alert timer:", error);
        toast.error("Failed to fetch alert timer value");
      }
    };
    fetchAlertTimer();
  }, []);

  // Group defects by station_name
  const groupedDefects = useMemo(() => {
    const stationMap = new Map();
    defects.forEach((defect) => {
      if (!stationMap.has(defect.station_name)) {
        stationMap.set(defect.station_name, []);
      }
      stationMap.get(defect.station_name).push(defect);
    });
    return Array.from(stationMap.entries());
  }, [defects]);

  useEffect(() => {
    prevDefectsRef.current = defects;
  }, [defects]);

  const getTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(); // Format the date as per locale
    setToday(formattedDate);
  }, []);

  const groupedDefects1 = (allDefects || []).reduce((acc, defect) => {
    const station = defect.station_name;
    if (!acc[station]) {
      acc[station] = [];
    }
    acc[station].push(defect);
    return acc;
  }, {});

  return (
    <div className="con">
      <div
        className="heading-container"
        style={{
          position: "relative",
          backgroundColor: "#f0f0f0", // Background block color
          padding: "50px",
          textAlign: "center",
          marginBottom: "20px",
          borderRadius: "8px", // Add rounded corners if needed
        }}
      >
        {/* Left Logo */}
        <img
          src={`/Hero-Logo.png`}
          alt="Hero Logo"
          style={{
            position: "absolute",
            left: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "150px",
          }}
        />

        {/* Heading */}
        <h2 style={{ margin: 0 }}>
          <b>
            Engine Assembly Line Defect Monitoring System - Zone {id || "-"}
          </b>
        </h2>

        {/* Right Logo */}
        <img
          src={`/tnd_logo.png`}
          alt="Right Logo"
          style={{
            position: "absolute",
            right: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "100px",
          }}
        />
      </div>
      <div textAlign = "right">
        <h5>Date - {today}</h5>
      </div>

      <CRow className="g-4">
        {Object.entries(groupedDefects1).map(([stationName, defectsArr]) => (
          <CCol key={stationName} md={6} lg={4}>
            <CCard className="station-card">
              <CCardBody>
                <h4>{stationName}</h4>
                <hr></hr>
                {defectsArr[0].defects.map((defect) => (
                  <div id={defect.id} className="defect-box">
                    <p>{defect.defect_name}</p> 
                  </div>
                ))}
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </div>
  );
};

export default Zone;
