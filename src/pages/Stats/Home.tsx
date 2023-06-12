import React, { useState } from "react";

import { useGetAdsByStatusQuery, useGetCountAdsPerDateQuery } from "../../redux/api/adsApi";
import { useVerifiedUsersQuery } from "../../redux/api/userApi";
import { Box, Grid, Typography } from "@mui/material";

import { Spinner } from "../../components/Spinner/spinner";
import StatBox from "../../components/StatsBox/StatsBox";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { PATHS } from "../../routes/Path";
import ReactECharts from "echarts-for-react";
import QueryStatsIcon from '@mui/icons-material/QueryStats';

const Home = () => {
  const {
    data: DataWaitingStatus,
    isLoading: loadingWaitingStatus,
    isSuccess: SuccessWaitingStatus,
  } = useGetAdsByStatusQuery("0");

  const { data } = useVerifiedUsersQuery();

  const numberVerifiedUsers = data?.data?.length;
  const numberWaitingAds = DataWaitingStatus?.data?.length;

  const { data: CountAdsPerDate, isLoading: loadingCountDataPerDate, isSuccess: successCountAdsPerDate } = useGetCountAdsPerDateQuery("");

  const options = {
    xAxis: {
      type: "category",
      data: CountAdsPerDate?.data.map((item: any) => {
        return item?.date;
      }),
    },
    yAxis: {},
    series: [
      {
        type: "line",
        data: CountAdsPerDate?.data.map((item: any) => item.count),
      },
    ],
  };


  return (
    <div>
      {loadingWaitingStatus && <Spinner />}
      {SuccessWaitingStatus && (
        <>
          <Grid container alignItems="center">
            <Grid item xs={12} sm={6}>
              <StatBox
                title="Waiting Advertises "
                subtitle="Total"
                value={numberWaitingAds}
                icon={<TimerOutlinedIcon />}
                backgroundCol="#0b2948"
                details={PATHS.ManageAds}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <StatBox
                title="Waiting Messages "
                subtitle="Total"
                value={"5"}
                icon={<MarkEmailUnreadOutlinedIcon />}
                backgroundCol="linear-gradient(45deg, rgb(77 121 226) 0%, rgb(90 225 255) 100%)"
                details={PATHS.CONVERSATIONS}

              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <StatBox
                title="Users signed up "
                subtitle="Total"
                value={numberVerifiedUsers}
                icon={<GroupOutlinedIcon />}
                details={PATHS.Users}
                backgroundCol="linear-gradient(45deg, rgb(77 121 226) 0%, rgb(90 225 255) 100%)
            "
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <StatBox
                title="Waiting reservations"
                subtitle="Total"
                value={"2"}
                icon={<TimerOutlinedIcon />}
                backgroundCol="#0b2948"
                details={PATHS.MYRESERVATIONS}

              />
            </Grid>


          </Grid>

          <Grid>

            <Grid xs={12} sm={12}>
              <Typography variant="h5" mt={2}><QueryStatsIcon />    Advertises added per date </Typography>
              {loadingCountDataPerDate && <Spinner />
              }
              {successCountAdsPerDate &&

                <ReactECharts option={options} style={{ height: "350px" }} />
              }
            </Grid>

          </Grid>
        </>
      )}
    </div>
  );
};

export default Home;
