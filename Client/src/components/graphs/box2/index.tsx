import DashboardBox from "@/components/DashboardBox";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const styles = {
  backgroundColor: 'white',
  padding: "8px",
  border: "1px solid #ccc",
}

function GraphsBox2() {
  const [policyYear, setPolicyYear] = useState([]);
  const selectedYear = useSelector((state) => state.filter.selectedYear);
  const selectedMLB1 = useSelector((state) => state.filter.selectedMLB1);
  const selectedMLB2 = useSelector((state) => state.filter.selectedMLB2);

  //   console.log(selectedYear, selectedMLB1, selectedMLB2);

  const fetchData = async (years) => {
    const claimsData = await Promise.all(
      years.map(async (year) => {
        const endpoints = [
          `http://localhost:1337/graph2/total_outstanding_by/${year}`,
          `http://localhost:1337/graph2/total_paid_by/${year}`,
          `http://localhost:1337/graph2/largest_claim_by/${year}`,
        ];

        const allData = await Promise.all(
          endpoints.map((endpoint) => axios.get(endpoint))
        );

        return {
          name: year.toString(),
          "Total Outstanding": allData[0].data,
          "Total Paid": allData[1].data,
          "Largest Claim": allData[2].data,
        };
      })
    );

    setPolicyYear(claimsData);
  };

  useEffect(() => {
    // let years = [];
    fetch("http://localhost:1337/dropdown/years")
      .then((response) => response.json())
      .then((yearsArray) => {
        fetchData(yearsArray);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <DashboardBox bgcolor="#fff" gridArea="b2">
        <h3>Total Incurred by Policy Year</h3>
        <ResponsiveContainer width="100%" height="90%">
          <ComposedChart
            width={200}
            height={400}
            data={policyYear}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 20,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis>
              <Label
                value={"Total Incurred"}
                angle={-90}
                offset={-15}
                position="insideLeft"
                style={{ textAnchor: "middle" }}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} wrapperStyle={styles} />
            <Legend />
            <Bar dataKey="Total Outstanding" stackId="a" fill="#002c77" />
            <Bar dataKey="Total Paid" stackId="a" fill="#76d3ff" />
            <Line
              type="monotone"
              dataKey="Largest Claim"
              strokeWidth="2.5"
              stroke="#00968F"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
}

export default GraphsBox2;
