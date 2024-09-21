import React, { useEffect, useRef, useMemo, useState } from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import useWebSocket from "react-use-websocket";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectDefectsByScreenNo, setDefects } from "../../redux/DefectsSlice";
import "./style.css";
import axios from "axios";
import { backendUrl, websocketUrl } from "../../config";

const Zone = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const defects = useSelector((state) => selectDefectsByScreenNo(state, id));
  const prevDefectsRef = useRef(defects);
  const alertTimerRef = useRef(5);
  const [today, setToday] = useState('');

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
    async function fetchZoneData() {
      try {
        const response = await axios.get(
          `${backendUrl}/zone/getZoneRecordsForToday/${id}`
        );
        if (response.data.status === 200) {
          const { data } = response.data;
          const zone = [];
          data.forEach((element) => {
            zone.push({
              id: element.id,
              defect_name: element.defect_name,
              defect_name_hi: element.defect_name_hi,
              station_id: element.station_id,
              screen_no: element.screen_no,
              operator_name: element.operator_name,
              updated_at: element.updated_at,
              count: 1,
              is_updated: false,
            });
          });
          dispatch(setDefects(zone));
        } else {
          toast.error("Failed to fetch zone records");
        }
      } catch (error) {
        console.error("Error fetching zone records:", error);
        toast.error("Failed to fetch zone records");
      }
    }

    fetchZoneData();
  }, []);

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
              station_id: element.station_id,
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

  const defectsArr = useMemo(() => {
    const defectMap = new Map();

    defects.forEach((defect) => {
      const prevDefect = prevDefectsRef.current.find(
        (el) => el.id === defect.id
      );
      const isUpdated = prevDefect ? prevDefect.count !== defect.count : true;
      defectMap.set(defect.id, { ...defect, is_updated: isUpdated });
    });

    const sortedDefects = Array.from(defectMap.values()).sort((a, b) => {
      const dateA = new Date(a.updated_at);
      const dateB = new Date(b.updated_at);
      return dateB - dateA;
    });

    return sortedDefects;
  }, [defects, prevDefectsRef]);

  useEffect(() => {
    prevDefectsRef.current = defects;
  }, [defects]);

  const getTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  
  
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(); // Format the date as per locale
    setToday(formattedDate);
  }, []);
  
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
            width: "200px",
          }}
        />

        {/* Heading */}
        <h1 style={{ margin: 0 }}>
          <b>
            Engine Assembly Line Defect Monitoring System - Zone {id || "-"}
          </b>
        </h1>

        {/* Right Logo */}
        <img
          src={`/tnd_logo.png`}
          alt="Right Logo"
          style={{
            position: "absolute",
            right: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "150px",
          }}
        />
      </div>
          <div>
            <h3>Date - {today}</h3>
          </div>
      <CRow className="g-4">
        {defectsArr.length > 0 && (
          <CTable responsive striped bordered className="custom-table">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Time</CTableHeaderCell>
                <CTableHeaderCell>
                  Defect Name / Defect Name Hindi
                </CTableHeaderCell>
                <CTableHeaderCell>Operator Name</CTableHeaderCell>
                <CTableHeaderCell>Today's Count</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {defectsArr.map((defect, index) => (
                <CTableRow backgroundColor key={index}>
                  <CTableDataCell
                    className={defect.is_updated ? "updated" : ""}
                    style={{
                      width: "10%",
                      height: "100px",
                      alignContent: "center",
                      fontSize: "2rem",
                      animationDuration: defect.is_updated
                        ? `${alertTimerRef.current}s`
                        : undefined,
                      animationFillMode: "forwards",
                    }}
                  >
                    {getTime(defect.updated_at)}
                  </CTableDataCell>
                  <CTableDataCell
                    className={defect.is_updated ? "updated" : ""}
                    style={{
                      width: "70%",
                      height: "100px",
                      fontSize: "2rem",
                      alignContent: "center",
                      animationDuration: defect.is_updated
                        ? `${alertTimerRef.current}s`
                        : undefined,
                      animationFillMode: "forwards",
                    }}
                  >
                    {defect.defect_name} &nbsp; / &nbsp;
                    {defect.defect_name_hi || "-"}
                  </CTableDataCell>
                  <CTableDataCell
                    defect-names
                    className={defect.is_updated ? "updated" : ""}
                    style={{
                      width: "20%",
                      height: "100px",
                      fontSize: "2rem",
                      alignContent: "center",
                      animationDuration: defect.is_updated
                        ? `${alertTimerRef.current}s`
                        : undefined,
                      animationFillMode: "forwards",
                    }}
                  >
                    {defect.operator_name}
                  </CTableDataCell>
                  <CTableDataCell
                    className={defect.is_updated ? "updated" : ""}
                    style={{
                      height: "100px",
                      fontSize: "2rem",
                      alignContent: "center",
                      animationDuration: defect.is_updated
                        ? `${alertTimerRef.current}s`
                        : undefined,
                      animationFillMode: "forwards",
                    }}
                  >
                    {defect.count || 1}
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        )}
      </CRow>
    </div>
  );    
};

export default Zone;
