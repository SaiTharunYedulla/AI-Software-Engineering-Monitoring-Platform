import { useEffect, useState } from "react";
import { socketService } from "../app/services/socket.service";

export const useSocket = (event: string) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    socketService.connect();

    socketService.on(event, (newData) => {
      setData((prevData) => [...prevData, newData]);
    });

    return () => {
      socketService.disconnect();
    };
  }, [event]);

  return data;
};
