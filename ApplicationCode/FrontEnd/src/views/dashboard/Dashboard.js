import { useEffect, useState } from "react";
import { CCol, CRow, CWidgetStatsD } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMonitor } from "@coreui/icons";
import useWebSocket from "react-use-websocket";
import { websocketUrl } from "../../config";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const state = useSelector((state) => state);
  const [clientCount, setClientCount] = useState(0);
  useEffect(() => {
    console.log("state", state);
  }, [state]);

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
    if (lastMessage !== null) {
      try {
        const message = JSON.parse(lastMessage.data);
        if (message.type === 'clientCount') {
          setClientCount(message.count);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    }
  }, [lastMessage]);

  return (
    <>
      <CRow>
        <CCol xs={2}>
          <CWidgetStatsD
            className="mb-3"
            icon={
              <CIcon
                className="my-4 text-white"
                icon={cilMonitor}
                height={52}
              />
            }
            style={{ "--cui-card-cap-bg": "#3b5998" }}
            values={[
              { title: "Clients Connected", value: clientCount > 0 ? clientCount : 0}
            ]}
          />
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
