import React, { useEffect, useMemo, useRef, useState } from "react";
import { CCard, CCardBody, CCol, CContainer, CRow, CCarousel, CCarouselItem, CImage } from "@coreui/react";
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
  const [initalDefects, setInitialDefects] = useState([]);

  const [allDefectsZero, setAllDefectsZero] = useState(false);
  const timerRef = useRef(null);

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `${websocketUrl}`,
    {
      onOpen: () => console.log("WebSocket connection established"),
      onClose: () => console.log("WebSocket connection closed"),
      onError: (error) => console.error("WebSocket error:", error),
      shouldReconnect: (closeEvent) => true,
    }
  );

   useEffect(() => {
    async function fetchAllDefects() {
      try {
        const response = await axios.get(`${backendUrl}/defects/screenNo/${id}`);
        if (response.status === 200) {
          const { data } = response;
          const defectsData = data.map((defect) => {
  
            return {
              id: defect.id,
              defect_name: defect.defect_name,
              defect_name_hi: defect.defect_name_hi,
              station_name: defect.station_name,
              operator_name: defect.operator_name,
              updated_at: defect.updated_at,
              screen_no: defect.screen_no,
              count: defect.count || 0, // Set count from existing if exists
            };
          });

          setInitialDefects(defectsData);
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
        const reportedDefects = message?.data;

        if (reportedDefects?.length) {
          const updatedDefectsArray = combineAllDefects(allDefects).map(defect => {
            // Create a shallow copy of each defect object
            const defectCopy = { ...defect };
            
            // Find matching defects from `reportedDefects` based on defect_name or other criteria
            const matchingDefects = reportedDefects.filter(
              reportedDefect => reportedDefect.defect_name === defect.defect_name && reportedDefect.screen_no === defect.screen_no
            );
            
            // Update count or any other property if matches are found
            if (matchingDefects.length > 0) {
              defectCopy.count += matchingDefects.length; // Adjust this logic based on your requirements
            }
  
            return defectCopy;
          });
  
          dispatch(setAllDefects(updatedDefectsArray));
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

  const combineAllDefects = (data) => {
    let combinedDefects = [];
    
    // Loop through each station
    data.forEach(station => {
        // If the station contains defects, add them to the combined array
        station.defects.forEach(defect => {
            combinedDefects = combinedDefects.concat(defect);
        });
    });
    
    return combinedDefects;
}

  const groupedDefects1 = (allDefects || []).reduce((acc, defect) => {
    const station = defect.station_name;
    if (!acc[station]) {
      acc[station] = [];
    }
    acc[station].push(defect);
    return acc;
  }, {});

  const checkDefectsZero = () => {
    const allZero = Object.entries(groupedDefects1).every(([stationName, defectsArr]) =>
      defectsArr[0].defects.every((defect) => defect.count === 0)
    );
    return allZero;
  };

  useEffect(() => {
    const allZero = checkDefectsZero();

    // Prevent re-render loops by only updating state if it has changed
    if (allZero && !allDefectsZero) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Start a new timer if all defects are zero
      timerRef.current = setTimeout(() => {
        if (checkDefectsZero()) {
          setAllDefectsZero(true);
        }
      }, 6000); // 60 seconds
    } else if (!allZero && allDefectsZero) {
      // Reset state if defects are no longer zero
      setAllDefectsZero(false);
    }

    // Cleanup the timer on unmount or when defects change
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [groupedDefects1, allDefectsZero]);


  return (
    <div className="con">
      <div
        className="heading-container"
        style={{
          position: "relative",
          backgroundColor: "#b5b5b5", // Background block color
          padding: "35px",
          textAlign: "center",
          marginBottom: "10px",
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
        <h4 style={{ margin: 0 }}>
          <b>
            Engine Assembly Line Defect Monitoring System - Zone {id || "-"}
          </b>
        </h4>

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
      <div style={{ textAlign: "right" }}>
        <h6><b>Date - {today}</b></h6>
      </div>

      <CContainer fluid>
      <CRow className="g-4">
        {!allDefectsZero ? (
          Object.entries(groupedDefects1).map(([stationName, defectsArr]) => (
            <CCol key={stationName} md={6} lg={4}>
              <CCard className="station-card">
                <CCardBody>
                  <h6>{stationName}</h6>
                  <hr />
                  {defectsArr[0].defects.map((defect) => (
                    <div id={defect.id} className="defect-box" key={defect.id}>
                      <p className="defect-name">{defect.defect_name}</p>
                      <span className="defect-count">{defect.count}</span>
                    </div>
                  ))}
                </CCardBody>
              </CCard>
            </CCol>
          ))
        ) : (
          <div className="no-defects-container">
            <h4>No Defects for the past 1 minute</h4>
          </div>
        )}
      </CRow>
    </CContainer>

    </div>
  );  
};

export default Zone;
