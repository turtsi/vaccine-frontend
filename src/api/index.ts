import qs from "qs";

export interface GetVaccineResponse {
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
}

export const createApiClient = () => {
  const apiUrl = "https://vaccine-exercise-backend.herokuapp.com";
  //const apiUrl = "http://localhost:5000";
  return {
    getVaccines: async (
      date: string,
      vaccine: string
    ): Promise<GetVaccineResponse> => {
      try {
        const d = qs.stringify({ date });
        const v = qs.stringify({ vaccine });
        const res = await fetch(`${apiUrl}/vaccines?${d}&${v}`);
        if (res.status === 200) {
          const data = await res.json();
          return data;
        }
        throw new Error("Error getting data");
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  };
};
