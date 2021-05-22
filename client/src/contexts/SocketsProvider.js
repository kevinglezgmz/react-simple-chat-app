import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketsProvider({ id, children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io("https://socketio-chat-back.herokuapp.com/", { query: { id } });
    console.log(newSocket);
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [id]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
