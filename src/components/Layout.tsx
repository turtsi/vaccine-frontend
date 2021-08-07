import { Header } from "./Header";
import { VaccineList } from "./VaccineList";
import Calendar from "react-calendar";
import styles from "../styles/styles.module.css";
import { useState } from "react";
import dayjs from "dayjs";
import { createApiClient, GetVaccineResponse } from "../api";
import { CircularProgress } from "@material-ui/core";
import { useEffect } from "react";

export const Layout = () => {
  const client = createApiClient();
  const [date, setDate] = useState("2021-04-12");
  const [antiquaStatus, setAntiquaStatus] = useState<GetVaccineResponse>();
  const [solarStatus, setSolarStatus] = useState<GetVaccineResponse>();
  const [zerpfyStatus, setZerpfyStatus] = useState<GetVaccineResponse>();
  const [antiquaLoading, setAntiquaLoading] = useState(false);
  const [solarLoading, setSolarLoading] = useState(false);
  const [zerpfyLoading, setZerpfyLoading] = useState(false);

  useEffect(() => {
    setAntiquaLoading(true);
    setSolarLoading(true);
    setZerpfyLoading(true);
    async function fetchData() {
      try {
        const antiqua = await client.getVaccines(date, "antiqua");
        if (antiqua) {
          setAntiquaStatus(antiqua);
          setAntiquaLoading(false);
        }
        const solar = await client.getVaccines(date, "solar");
        if (solar) {
          setSolarStatus(solar);
          setSolarLoading(false);
        }
        const zerpfy = await client.getVaccines(date, "zerpfy");
        if (zerpfy) {
          setZerpfyStatus(zerpfy);
          setZerpfyLoading(false);
        } else {
          throw new Error("Not found");
        }
      } catch (error) {
        console.error(error);
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
        <Calendar
          onChange={(e: any) => changeDate(e)}
          activeStartDate={new Date(2021, 4, 12)}
        />
      </div>
      <div className={styles.vaccineInfo}>Vaccine data on day {date}</div>
      <div className={styles.vaccineWrap}>
        <div className={styles.vaccineList}>
          <p className={styles.vaccineHeader}>Antiqua</p>
          {antiquaLoading ? (
            <div className={styles.loading}>
              <CircularProgress />
            </div>
          ) : (
            <VaccineList data={antiquaStatus} />
          )}
        </div>
        <div className={styles.vaccineList}>
          <p className={styles.vaccineHeader}>Solar</p>
          {solarLoading ? (
            <div className={styles.loading}>
              <CircularProgress />
            </div>
          ) : (
            <VaccineList data={solarStatus} />
          )}
        </div>
        <div className={styles.vaccineList}>
          <p className={styles.vaccineHeader}>Zerpfy</p>
          {zerpfyLoading ? (
            <div className={styles.loading}>
              <CircularProgress />
            </div>
          ) : (
            <VaccineList data={zerpfyStatus} />
          )}
        </div>
        <div className={styles.vaccineList}>
          <p className={styles.vaccineHeader}>Total data</p>
          {antiquaLoading || zerpfyLoading || solarLoading ? (
            <div className={styles.loading}>
              <CircularProgress />
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
  );
};
