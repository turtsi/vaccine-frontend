import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { GetVaccineResponse } from "../../api";
import { TotalData } from "./VaccineList";

type Props = {
  data: GetVaccineResponse;
  total: TotalData | undefined;
};

export const GenderList = ({ data, total }: Props) => {
  const percent = (gender: string, list: string) => {
    if (total) {
      const totalGenders =
        total.gender.male + total.gender.female + total.gender.nonbinary;
      if (list === "total") {
        if (gender === "male") {
          return Math.round((total.gender.male / totalGenders) * 100);
        } else if (gender === "female") {
          return Math.round((total.gender.female / totalGenders) * 100);
        } else if (gender === "nonbinary") {
          return Math.round((total.gender.female / totalGenders) * 100);
        } else return "Gender Error";
      }
    }
    const dataGenders =
      data.gender.male + data.gender.female + data.gender.nonbinary;
    if (list === "data") {
      if (gender === "male") {
        return Math.round((data.gender.male / dataGenders) * 100);
      } else if (gender === "female") {
        return Math.round((data.gender.female / dataGenders) * 100);
      } else if (gender === "nonbinary") {
        return Math.round((data.gender.female / dataGenders) * 100);
      } else return "Gender Error";
    } else return "List Error";
  };
  return (
    <>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <TreeItem nodeId="1" label="Number of vaccinated per gender">
          <TreeItem
            nodeId="2"
            label={
              total ? (
                <div>
                  &emsp;Males: {total.gender.male} ({percent("male", "total")}
                  %)
                </div>
              ) : (
                <div>
                  &emsp;Males: {data.gender.male} ({percent("male", "data")}
                  %)
                </div>
              )
            }
          />
          <TreeItem
            nodeId="3"
            label={
              total ? (
                <div>
                  &emsp;Females: {total.gender.female} (
                  {percent("female", "total")}
                  %)
                </div>
              ) : (
                <div>
                  &emsp;Females: {data.gender.female} (
                  {percent("female", "data")}
                  %)
                </div>
              )
            }
          />
          <TreeItem
            nodeId="4"
            label={
              total ? (
                <div>
                  &emsp;Nonbinary: {total.gender.nonbinary} (
                  {percent("nonbinary", "total")}
                  %)
                </div>
              ) : (
                <div>
                  &emsp;Nonbinary: {data.gender.nonbinary} (
                  {percent("nonbinary", "data")}
                  %)
                </div>
              )
            }
          />
        </TreeItem>
      </TreeView>
    </>
  );
};
