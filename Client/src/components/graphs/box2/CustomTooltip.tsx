import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";




function CustomTooltip({ payload, label, active }) {

    if (active) {
        return (
            <>
                <div className="custom-tooltip" >
                    <p className="label">{`Policy Year : ${label}`}</p>
                    <p className="label">{`Total Incurred : ${payload[1].value}`}</p>
                    <p className="label">{`Largest Claim : ${payload[2].value}`}</p>
                </div>
            </>
        );
    }
    return null;
}

export default CustomTooltip