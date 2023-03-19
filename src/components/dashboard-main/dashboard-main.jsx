import FirstViz from "../first-viz/first-viz";
import {useEffect, useRef, useState} from "react";
import * as d3 from "d3"
import data from "../../data/supermarket_sales - Sheet1.csv";
const DashboardMain =()=>{

    const [state, setState] = useState([]);
    const [stillIterating, setStillIterating] = useState(true);

    useEffect(()=>{

        d3.csv(data).then(data=>{
            setState(data)
        })


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
const Circles = ()=>{

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
