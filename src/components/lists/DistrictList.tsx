import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { GetVaccineResponse } from "../../api";
import { TotalData } from "./VaccineList";

type Props = {
  data: GetVaccineResponse;
  total: TotalData | undefined;
};

export const DistrictList = ({ data, total }: Props) => {
  const percent = (district: string, list: string) => {
    if (total) {
      const totalDistricts =
        total.vaccinationsPerDistrict.hyks +
        total.vaccinationsPerDistrict.kys +
        total.vaccinationsPerDistrict.oys +
        total.vaccinationsPerDistrict.tays +
        total.vaccinationsPerDistrict.tyks;
      if (list === "total") {
        if (district === "hyks") {
          return Math.round(
            (total.vaccinationsPerDistrict.hyks / totalDistricts) * 100
          );
        } else if (district === "kys") {
          return Math.round(
            (total.vaccinationsPerDistrict.kys / totalDistricts) * 100
          );
        } else if (district === "oys") {
          return Math.round(
            (total.vaccinationsPerDistrict.oys / totalDistricts) * 100
          );
        } else if (district === "tays") {
          return Math.round(
            (total.vaccinationsPerDistrict.tays / totalDistricts) * 100
          );
        } else if (district === "tyks") {
          return Math.round(
            (total.vaccinationsPerDistrict.tyks / totalDistricts) * 100
          );
        } else return "District Error";
      }
    }

    const dataDistricts =
      data.vaccinationsPerDistrict.hyks +
      data.vaccinationsPerDistrict.kys +
      data.vaccinationsPerDistrict.oys +
      data.vaccinationsPerDistrict.tays +
      data.vaccinationsPerDistrict.tyks;
    if (list === "data") {
      if (district === "hyks") {
        return Math.round(
          (data.vaccinationsPerDistrict.hyks / dataDistricts) * 100
        );
      } else if (district === "kys") {
        return Math.round(
          (data.vaccinationsPerDistrict.kys / dataDistricts) * 100
        );
      } else if (district === "oys") {
        return Math.round(
          (data.vaccinationsPerDistrict.oys / dataDistricts) * 100
        );
      } else if (district === "tays") {
        return Math.round(
          (data.vaccinationsPerDistrict.tays / dataDistricts) * 100
        );
      } else if (district === "tyks") {
        return Math.round(
          (data.vaccinationsPerDistrict.tyks / dataDistricts) * 100
        );
      } else return "District Error";
    } else return "List Error";
  };

  return (
    <>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <TreeItem nodeId="5" label="Vaccinations per health district">
          <TreeItem
            nodeId="6"
            label={
              total ? (
                <div>
                  &emsp;HYKS: {total.vaccinationsPerDistrict.hyks} (
                  {percent("hyks", "total")}%)
                </div>
              ) : (
                <div>
                  &emsp;HYKS: {data.vaccinationsPerDistrict.hyks} (
                  {percent("hyks", "data")}%)
                </div>
              )
            }
          />
          <TreeItem
            nodeId="7"
            label={
              total ? (
                <div>
                  &emsp;KYS: {total.vaccinationsPerDistrict.kys} (
                  {percent("kys", "total")}%)
                </div>
              ) : (
                <div>
                  &emsp;KYS: {data.vaccinationsPerDistrict.kys} (
                  {percent("kys", "data")}%)
                </div>
              )
            }
          />
          <TreeItem
            nodeId="8"
            label={
              total ? (
                <div>
                  &emsp;OYS: {total.vaccinationsPerDistrict.oys} (
                  {percent("oys", "total")}%)
                </div>
              ) : (
                <div>
                  &emsp;OYS: {data.vaccinationsPerDistrict.oys} (
                  {percent("oys", "data")}%)
                </div>
              )
            }
          />
          <TreeItem
            nodeId="9"
            label={
              total ? (
                <div>
                  &emsp;TAYS: {total.vaccinationsPerDistrict.tays} (
                  {percent("tays", "total")}%)
                </div>
              ) : (
                <div>
                  &emsp;TAYS: {data.vaccinationsPerDistrict.tays} (
                  {percent("tays", "data")}%)
                </div>
              )
            }
          />
          <TreeItem
            nodeId="10"
            label={
              total ? (
                <div>
                  &emsp;TYKS: {total.vaccinationsPerDistrict.tyks} (
                  {percent("tyks", "total")}%)
                </div>
              ) : (
                <div>
                  &emsp;TYKS: {data.vaccinationsPerDistrict.tyks} (
                  {percent("tyks", "data")}%)
                </div>
              )
            }
          />
        </TreeItem>
      </TreeView>
    </>
  );
};
