import FirstViz from "../first-viz/first-viz";
import {useEffect, useMemo, useRef, useState} from "react";
import * as d3 from "d3"
import data from "../../data/supermarket_sales - Sheet1.csv";
import {queryAllByAttribute} from "@testing-library/react";
import useInterval from "../../customHooks/useInterval";
const DashboardMain =()=>{

    const [state, setState] = useState([]);
    const [stillIterating, setStillIterating] = useState(true);
    const generateDataset = () => (
        Array(10).fill(0).map(() => ([
            Math.random() * 80 + 10,
            Math.random() * 35 + 10,
        ]))
    )
    const toNumber =(d)=>{
        for(var key in d){
            d[key.replace(/\s+/,'_')] = d[key];

            if (key.indexOf(" ") > -1 || key.indexOf("%") > -1) {
                delete d[key];
            }
        }

        d.Quantity = +d.Quantity
        d.Rating = +d.Rating
        d.gross_income = +d.gross_income
        d.Total = +d.Total
        d.Unit_price = +d.Unit_price
        d.cogs = +d.cogs

        return d
    }

    useEffect(()=>{

        d3.csv(data, toNumber).then(setState)


    },[])


console.log(state)
    return (
        <div>
            <h1>
                DASHBOARD MAIN
            </h1>
            <main>
                <FirstViz/>
                <Circle/>
                <Circles props={generateDataset}/>
                <MoreVanillaCircles func={generateDataset}/>
                <Axis/>
            </main>

        </div>
    )
}
export default DashboardMain;

const Circle = ()=>{

    const ref = useRef();

    useEffect(()=>{

        const  svgElement = d3.select(ref.current)
        svgElement.append("circle")
            .attr("cx", 150)
            .attr("cy",70)
            .attr("r",50)

    },[])
    return (
        <svg ref={ref}/>
    )

}

const Circles = ({props})=>{
    const [dataset, setDataset] = useState(props);
    console.log(dataset)
    const ref = useRef();

    useEffect(() => {
        return () => {
            const svgElement = d3.select(ref.current)
            svgElement.selectAll("circle")
                .data(dataset)
                .join("circle")
                .attr("cx", d => d[0])
                .attr("cy", d=>d[1])
                .attr("r",3)
        };
    }, [dataset]);

    useInterval(() => {
        const newDataset = props;
        setDataset(newDataset)
    }, 2000)


    return(

        <svg viewBox="0 0 100 50" ref={ref}/>
    )
}

const MoreVanillaCircles =({func})=>{
    const [dataset, setDataset] = useState(
        func()
    )
    useInterval(() => {
        const newDataset = func
        setDataset(newDataset)
    }, 2000)


    return (
        <svg viewBox="0 0 100 50">
            {dataset.map(([x, y], i) => (
                <circle
                    cx={x}
                    cy={y}
                    r="3"
                />
            ))}
        </svg>
    )
}
const Axis = ({
                  domain=[0, 100],
                  range=[10, 290],
              }) => {
    const ticks = useMemo(() => {
        const xScale = d3.scaleLinear()
            .domain(domain)
            .range(range)
        const width = range[1] - range[0]
        const pixelsPerTick = 30
        const numberOfTicksTarget = Math.max(
            1,
            Math.floor(
                width / pixelsPerTick
            )
        )
        return xScale.ticks(numberOfTicksTarget)
            .map(value => ({
                value,
                xOffset: xScale(value)
            }))
    }, [
        domain.join("-"),
        range.join("-")
    ])
    return (
        <svg>
            <path
                d={[
                    "M", range[0], 6,
                    "v", -6,
                    "H", range[1],
                    "v", 6,
                ].join(" ")}
                fill="none"
                stroke="currentColor"
            />
            {ticks.map(({ value, xOffset }) => (
                <g
                    key={value}
                    transform={`translate(${xOffset}, 0)`}
                >
                    <line
                        y2="6"
                        stroke="currentColor"
                    />
                    <text
                        key={value}
                        style={{
                            fontSize: "10px",
                            textAnchor: "middle",
                            transform: "translateY(20px)"
                        }}>
                        { value }
                    </text>
                </g>
            ))}
        </svg>
    )
}