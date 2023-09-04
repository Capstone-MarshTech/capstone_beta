import DashboardBox from "@/components/DashboardBox";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
} from "recharts";

const GraphsBox4 = () => {
  const [lossBandingData, setLossBandingData] = useState([]);
  const [lossBandingDataYear, setLossBandingDataYear] = useState([]);
  const [dataWithMetrics, setDataWithMetrics] = useState([]);
  const [dataWithMetricsYear, setDataWithMetricsYear] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const selectedYear = useSelector((state) => state.filter.selectedYear);
  const selectedMLB1 = useSelector((state) => state.filter.selectedMLB1);
  const selectedMLB2 = useSelector((state) => state.filter.selectedMLB2);
  const showTitle =
    !selectedYear && !selectedMLB1 && !selectedMLB2
      ? "Largest Claim Against Average Cost per Claim by Loss Band by All Years"
      : `Largest Claim Against Average Cost per Claim by Loss Band ${
          selectedYear ? `(${selectedYear}` : ""
        } ${selectedMLB1 ? `${selectedMLB1}` : ""} ${
          selectedMLB2 ? `and ${selectedMLB2})` : ")"
        }`;

  console.log(selectedYear, selectedMLB1, selectedMLB2);

  // useEffect for the case when there is no filter applied
  //fetch the loss bandings
  useEffect(() => {
    const fetchLossBandingData = async () => {
      try {
        // console.log(import.meta.env.VITE_BASE_URL);
        const response = await axios.get(
          `${baseUrl}/dropdown/loss_banding_values`
        );
        setLossBandingData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLossBandingData();
  }, []);

  //fetch the loss bandings based on the year
  useEffect(() => {
    const fetchLossBandingDataByYear = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/graph4/loss_banding_values_by/${selectedYear}`
        );
        setLossBandingDataYear(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedYear) {
      fetchLossBandingDataByYear();
    }
  }, [selectedYear]);

  //filter not applied
  useEffect(() => {
    if (lossBandingData.length > 0) {
      const fetchData = async () => {
        try {
          const largestClaimsPromises = lossBandingData.map(
            async (eachBanding) => {
              const response = await axios.get(
                `${baseUrl}/graph4/largest_claim_by?loss_banding=${eachBanding}`
              );
              return response.data;
            }
          );

          const averageTotalIncurredPromises = lossBandingData.map(
            async (eachBanding) => {
              const response = await axios.get(
                `${baseUrl}/graph4/average_total_incurred_by?loss_banding=${eachBanding}`
              );
              return response.data;
            }
          );

          const largestClaims = await Promise.all(largestClaimsPromises);
          const averageTotalIncurred = await Promise.all(
            averageTotalIncurredPromises
          );

          const newData = lossBandingData.map((eachBanding, index) => ({
            "Loss Banding": eachBanding,
            "Average Total Incurred": averageTotalIncurred[index].toFixed(2),
            "Largest Claim": largestClaims[index].toFixed(2),
          }));

          setDataWithMetrics(newData);
        } catch (err) {
          console.error(err);
        }
      };

      fetchData();
    }
  }, [lossBandingData]);

  // if the YEAR filter is applied
  useEffect(() => {
    /*change here */
    if (lossBandingDataYear.length > 0 && selectedYear) {
      const fetchDataByYear = async () => {
        try {
          const largestClaimsPromises = lossBandingDataYear.map(
            async (eachBanding) => {
              const response = await axios.get(
                `${baseUrl}/statistics/largest_claim_by/${selectedYear}?loss_banding=${eachBanding}`
              );
              return response.data;
            }
          );

          const averageTotalIncurredPromises = lossBandingDataYear.map(
            async (eachBanding) => {
              const response = await axios.get(
                `${baseUrl}/statistics/average_total_incurred_by/${selectedYear}?loss_banding=${eachBanding}`
              );
              return response.data;
            }
          );

          const largestClaims = await Promise.all(largestClaimsPromises);
          const averageTotalIncurred = await Promise.all(
            averageTotalIncurredPromises
          );

          const newData = lossBandingDataYear.map((eachBanding, index) => ({
            "Loss Banding": eachBanding,
            "Average Total Incurred": averageTotalIncurred[index].toFixed(2),
            "Largest Claim": largestClaims[index].toFixed(2),
          }));

          setDataWithMetricsYear(newData);
        } catch (err) {
          console.error(err);
        }
      };
      fetchDataByYear();
    }
  }, [lossBandingDataYear, selectedYear]);

  // console.log(dataWithMetricsYear);

  return (
    <>
      <DashboardBox bgcolor="#fff" gridArea="b4">
        <h3>{showTitle}</h3>
        <ResponsiveContainer width="100%" height="90%">
          {selectedYear ? (
            <ComposedChart
              width={200}
              height={400}
              data={dataWithMetricsYear}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 20,
              }}
            >
              <XAxis dataKey="Loss Banding" />
              <YAxis>
                <Label
                  value={"Largest Claim"}
                  angle={-90}
                  offset={-15}
                  position="insideLeft"
                  style={{ textAnchor: "middle" }}
                />
              </YAxis>
              <Tooltip />
              <Legend />
              <Bar dataKey="Largest Claim" stackId="a" fill="#002c77" />

              <Line
                type="monotone"
                dataKey="Average Total Incurred"
                strokeWidth="2.5"
                stroke="#65cdff"
              />
            </ComposedChart>
          ) : (
            <ComposedChart
              width={200}
              height={400}
              data={dataWithMetrics}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 20,
              }}
            >
              <XAxis dataKey="Loss Banding" />
              <YAxis>
                <Label
                  value={"Largest Claim"}
                  angle={-90}
                  offset={-15}
                  position="insideLeft"
                  style={{ textAnchor: "middle" }}
                />
              </YAxis>

              <Tooltip />
              <Legend />
              <Bar dataKey="Largest Claim" stackId="a" fill="#002c77" />
              <Line
                type="monotone"
                dataKey="Average Total Incurred"
                strokeWidth="2.5"
                stroke="#65cdff"
              />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default GraphsBox4;
