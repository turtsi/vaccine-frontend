import { useEffect, useState } from "react";

type Props = {
  data: any;
  option1?: any;
  option2?: any;
};

type TotalData = {
  totalOrders: number;
  ordersToday: number;
  totalInjections: number;
  totalUsed: number;
  vaccinesLeft: number;
  totalExpiredBottles: number;
  totalExpiredInjections: number;
  nextTenDayExpire: number;
  gender: {
    male: number;
    female: number;
    nonbinary: number;
  };
};

export const VaccineList = (props: Props) => {
  const { data, option1, option2 } = props;
  const [total, setTotal] = useState<TotalData>();

  useEffect(() => {
    if (option1 && option2) {
      setTotal(getTotal(props));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            Number of vaccinated per gender:{" "}
            <div>
              {total ? (
                <div>
                  &emsp;Males: {total.gender.male} (
                  {Math.round(
                    (total.gender.male /
                      (total.gender.male +
                        total.gender.female +
                        total.gender.nonbinary)) *
                      100
                  )}
                  %)
                </div>
              ) : (
                <div>
                  &emsp;Males: {data.gender.male} (
                  {Math.round(
                    (data.gender.male /
                      (data.gender.male +
                        data.gender.female +
                        data.gender.nonbinary)) *
                      100
                  )}
                  %)
                </div>
              )}
            </div>
            <div>
              {total ? (
                <div>
                  &emsp;Females: {total.gender.female} (
                  {Math.round(
                    (total.gender.female /
                      (total.gender.male +
                        total.gender.female +
                        total.gender.nonbinary)) *
                      100
                  )}
                  %)
                </div>
              ) : (
                <div>
                  &emsp;Females: {data.gender.female} (
                  {Math.round(
                    (data.gender.female /
                      (data.gender.male +
                        data.gender.female +
                        data.gender.nonbinary)) *
                      100
                  )}
                  %)
                </div>
              )}
            </div>
            <div>
              {total ? (
                <div>
                  &emsp;Nonbinary: {total.gender.nonbinary} (
                  {Math.round(
                    (total.gender.nonbinary /
                      (total.gender.male +
                        total.gender.female +
                        total.gender.nonbinary)) *
                      100
                  )}
                  %)
                </div>
              ) : (
                <div>
                  &emsp;Nonbinary: {data.gender.nonbinary} (
                  {Math.round(
                    (data.gender.nonbinary /
                      (data.gender.male +
                        data.gender.female +
                        data.gender.nonbinary)) *
                      100
                  )}
                  %)
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const getTotal = (props: Props) => {
  const { data, option1, option2 } = props;
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
