import { Header } from "./Header";
import { VaccineList } from "../lists/VaccineList";
import Calendar from "react-calendar";
import styles from "../../styles/styles.module.css";
import { useState } from "react";
import dayjs from "dayjs";
import { createApiClient, GetVaccineResponse } from "../../api";
import { LinearProgress, Button } from "@material-ui/core";
import { useEffect } from "react";
import "react-calendar/dist/Calendar.css";

export const Layout = () => {
  const client = createApiClient();
  const [date, setDate] = useState("2021-04-12");
  const [antiquaStatus, setAntiquaStatus] = useState<GetVaccineResponse>();
  const [solarStatus, setSolarStatus] = useState<GetVaccineResponse>();
  const [zerpfyStatus, setZerpfyStatus] = useState<GetVaccineResponse>();
  const [antiquaLoading, setAntiquaLoading] = useState(false);
  const [solarLoading, setSolarLoading] = useState(false);
  const [zerpfyLoading, setZerpfyLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setAntiquaLoading(true);
    async function fetchData() {
      try {
        const antiqua = await client.getVaccines(date, "antiqua");
        if (antiqua) {
          setAntiquaStatus(antiqua);
          setAntiquaLoading(false);
        }
      } catch (error) {
        setMessage("Error occurred. Press Ok");
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  useEffect(() => {
    setSolarLoading(true);
    async function fetchData() {
      try {
        const solar = await client.getVaccines(date, "solar");
        if (solar) {
          setSolarStatus(solar);
          setSolarLoading(false);
        }
      } catch (error) {
        setMessage("Error occurred. Press Ok");
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  useEffect(() => {
    setZerpfyLoading(true);
    async function fetchData() {
      try {
        const zerpfy = await client.getVaccines(date, "zerpfy");
        if (zerpfy) {
          setZerpfyStatus(zerpfy);
          setZerpfyLoading(false);
        } else {
          throw new Error("Not found");
        }
      } catch (error) {
        setMessage("Error occurred. Press Ok");
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const changeDate = (e: string) => {
    setDate(dayjs(e).format("YYYY-MM-DD"));
  };
  return (
    <div>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.calendar}>
        <div className={"Calendar"}>
          <Calendar
            onChange={(e: any) => changeDate(e)}
            defaultActiveStartDate={new Date(2021, 3, 12)}
            minDate={new Date(2021, 0, 2)}
            maxDate={new Date(2021, 3, 12)}
          />
        </div>
      </div>
      <div className={styles.vaccineInfo}>
        Vaccine data on {dayjs(date).format("DD/MM/YYYY")}
      </div>
      <div>
        {message !== "" ? (
          <div className={styles.error}>
            {message}
            <div>
              <Button onClick={() => setMessage("")}>Ok</Button>
            </div>
          </div>
        ) : (
          <div className={styles.vaccineWrap}>
            <div className={styles.vaccineLeft}>
              <p className={styles.vaccineHeader}>Antiqua</p>
              {antiquaLoading ? (
                <div className={styles.loading}>
                  <LinearProgress />
                </div>
              ) : (
                <VaccineList data={antiquaStatus} />
              )}
            </div>
            <div className={styles.vaccineRight}>
              <p className={styles.vaccineHeader}>Solar Buddhica</p>
              {solarLoading ? (
                <div className={styles.loading}>
                  <LinearProgress />
                </div>
              ) : (
                <VaccineList data={solarStatus} />
              )}
            </div>
            <div className={styles.vaccineWrap}>
              <div className={styles.vaccineLeft}>
                <p className={styles.vaccineHeader}>Zerpfy</p>
                {zerpfyLoading ? (
                  <div className={styles.loading}>
                    <LinearProgress />
                  </div>
                ) : (
                  <VaccineList data={zerpfyStatus} />
                )}
              </div>
              <div className={styles.vaccineRight}>
                <p className={styles.vaccineHeader}>Total data</p>
                {antiquaLoading || zerpfyLoading || solarLoading ? (
                  <div className={styles.loading}>
                    <LinearProgress />
                  </div>
                ) : (
                  <VaccineList
                    data={antiquaStatus}
                    option1={solarStatus}
                    option2={zerpfyStatus}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
