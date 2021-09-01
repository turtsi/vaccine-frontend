/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { GenderList } from "./GenderList";
import { DistrictList } from "./DistrictList";
import { GetVaccineResponse } from "../../api";

type Props = {
  data: GetVaccineResponse | undefined;
  option1?: GetVaccineResponse | undefined;
  option2?: GetVaccineResponse | undefined;
};

export type TotalData = {
  totalOrders: number;
  ordersToday: number;
  totalInjections: number;
  totalUsed: number;
  vaccinesLeft: number;
  totalExpiredBottles: number;
  totalExpiredInjections: number;
  nextTenDayExpire: number;
  vaccinationsPerDistrict: {
    hyks: number;
    kys: number;
    oys: number;
    tays: number;
    tyks: number;
  };
  gender: {
    male: number;
    female: number;
    nonbinary: number;
  };
};

export const VaccineList = ({ data, option1, option2 }: Props) => {
  const [total, setTotal] = useState<TotalData>();

  useEffect(() => {
    if (option1 && option2) {
      setTotal(getTotal({ data, option1, option2 }));
    }
  }, []);

  return (
    <>
      {data && (
        <div>
          <div>
            Orders today: {total ? total.ordersToday : data.ordersToday}
          </div>
          <div>
            Total orders: {total ? total.totalOrders : data.totalOrders}
          </div>
          <div>
            Total injections:{" "}
            {total ? total.totalInjections : data.totalInjections}
          </div>
          <div>
            Total used vaccines: {total ? total.totalUsed : data.totalUsed}
          </div>
          <div>
            Vaccines left: {total ? total.vaccinesLeft : data.vaccinesLeft}
          </div>
          <div>
            Expired bottles:{" "}
            {total ? total.totalExpiredBottles : data.totalExpiredBottles}
          </div>
          <div>
            Expired injections:{" "}
            {total ? total.totalExpiredInjections : data.totalExpiredInjections}
          </div>
          <div>
            Vaccines expiring in next ten days:{" "}
            {total ? total.nextTenDayExpire : data.nextTenDayExpire}
          </div>
          <div>
            <DistrictList data={data} total={total} />
            <GenderList data={data} total={total} />
          </div>
        </div>
      )}
    </>
  );
};

const getTotal = ({ data, option1, option2 }: Props) => {
  if (data === undefined || option1 === undefined || option2 === undefined)
    return;
  const total: TotalData = {
    ordersToday: data.ordersToday + option1.ordersToday + option2.ordersToday,
    totalOrders: data.totalOrders + option1.totalOrders + option2.totalOrders,
    totalInjections:
      data.totalInjections + option1.totalInjections + option2.totalInjections,
    totalUsed: data.totalUsed + option1.totalUsed + option2.totalUsed,
    vaccinesLeft:
      data.vaccinesLeft + option1.vaccinesLeft + option2.vaccinesLeft,
    totalExpiredBottles:
      data.totalExpiredBottles +
      option1.totalExpiredBottles +
      option2.totalExpiredBottles,
    totalExpiredInjections:
      data.totalExpiredInjections +
      option1.totalExpiredInjections +
      option2.totalExpiredInjections,
    nextTenDayExpire:
      data.nextTenDayExpire +
      option1.nextTenDayExpire +
      option2.nextTenDayExpire,
    vaccinationsPerDistrict: {
      hyks:
        data.vaccinationsPerDistrict.hyks +
        option1.vaccinationsPerDistrict.hyks +
        option2.vaccinationsPerDistrict.hyks,
      kys:
        data.vaccinationsPerDistrict.kys +
        option1.vaccinationsPerDistrict.kys +
        option2.vaccinationsPerDistrict.kys,
      oys:
        data.vaccinationsPerDistrict.oys +
        option1.vaccinationsPerDistrict.oys +
        option2.vaccinationsPerDistrict.oys,
      tays:
        data.vaccinationsPerDistrict.tays +
        option1.vaccinationsPerDistrict.tays +
        option2.vaccinationsPerDistrict.tays,
      tyks:
        data.vaccinationsPerDistrict.tyks +
        option1.vaccinationsPerDistrict.tyks +
        option2.vaccinationsPerDistrict.tyks,
    },
    gender: {
      male: data.gender.male + option1.gender.male + option2.gender.male,
      female:
        data.gender.female + option1.gender.female + option2.gender.female,
      nonbinary:
        data.gender.nonbinary +
        option1.gender.nonbinary +
        option2.gender.nonbinary,
    },
  };
  return total;
};
