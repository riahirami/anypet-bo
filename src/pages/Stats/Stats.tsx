import React, { useState } from "react";
import {
  useGetAdsStatsQuery,
} from "../../redux/api/adsApi";
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApi";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  MenuItem,
  TextField,
  Grid,
} from "@mui/material";
import { StatusOption } from "../../core/enums/status";
import ReactECharts from "echarts-for-react";
import { Spinner } from "../../components/Spinner/spinner";
import {Category} from "../../core/models/category.model";
import { itemStats } from "../../core/models/itemStats.model";
import { getState, statusToString } from '../../core/services/helpers';


const Stats = () => {
  const [column, setColumn] = useState("category_id");
  const {
    data: Statsdata,
    isLoading,
    refetch,
    isSuccess,
  } = useGetAdsStatsQuery(column);


  const chartData = Statsdata?.data.map((item: itemStats) => ({
    name: column === "status" ? statusToString(item.status) : "item[column]",
    value: item.total,
  }));

  const { data: CategoryData, refetch: RefetchCategory } =
    useGetAllCategoriesQuery(100);

  const changeIdtoCategory = (id: string) => {
    const category = CategoryData?.data.find((cat: Category) => cat.id == id);
    return category?.title || "Unknown Category";
  };

  const options = {
    xAxis: {
      type: "category",
      data: Statsdata?.data.map((item: itemStats) => {
        if (column == "status") {
          return statusToString(item.status) || "Unknown Status";
        } else if (column == "category_id" && item?.category_id) {
          return changeIdtoCategory(item.category_id) || "Unknown category";
        } else {
          return getState(item?.state) || "Unknown state";
        }
      }),
    },
    yAxis: {},
    series: [
      {
        type: "bar",
        data: Statsdata?.data.map((item: itemStats) => item.total),
      },
    ],
  };

  const options2 = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      right: 10,
      data: Statsdata?.data.map((item: itemStats) => {
        if (column === "status") {
          return {
            name: statusToString(item.status) || "Unknown Status",
            value: item.total,
          };
        } else if (column === "category_id" && item?.category_id) {
          return {
            name: changeIdtoCategory(item.category_id) || "Unknown Category",
            value: item.total,
          };
        } else {
          return {
            name: getState(item?.state) || "Unknown state",
            value: item.total,
          };
        }
      }),
    },
    series: [
      {
        name: "Advetises",
        type: "pie",
        radius: ["30%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "30",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: Statsdata?.data.map((item: itemStats) => {
          if (column === "status") {
            return {
              name: statusToString(item?.status) || "loading",
              value: item.total,
            };
          } else if (column === "category_id" && item?.category_id) {
            return {
              name: changeIdtoCategory(item?.category_id) || "loading",
              value: item?.total,
            };
          } else if (item?.state) {
            return {
              name: getState(item?.state) || "loading",
              value: item.total,
            };
          }
        }),
      },
    ],
  };

  const changeColumn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColumn(event.target.value);
    refetch();
  };

  return (
    <div>
      <TextField
        label="Filter by"
        select
        fullWidth
        variant="outlined"
        onChange={changeColumn}
        defaultValue={column} 
        
      >
        <MenuItem key="category_id" value="category_id">
          category
        </MenuItem>
        <MenuItem key="status" value="status">
          status
        </MenuItem>
        <MenuItem key="state" value="state">
          state
        </MenuItem>
      </TextField>
      
      {isLoading && <Spinner />}
      {isSuccess && (
        <>
          
          <Grid container >
            <Grid item xs={12} sm={12}>
              <ReactECharts option={options} style={{ height: "400px" }} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <ReactECharts option={options2} style={{ height:"400px"}} />
            </Grid>
          </Grid>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {column === "status"
                      ? "Status"
                      : column === "category_id"
                      ? "Category"
                      : "State"}
                  </TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Statsdata?.data.map((item: itemStats) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {column === "status"
                        ? statusToString(item.status)
                        : column === "category_id"
                        ? changeIdtoCategory(item.category_id)
                        : getState(item.state)}
                    </TableCell>
                    <TableCell>{item.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
};

export default Stats;
