import React, { useState, useEffect, useRef } from 'react';
import console_monkey_patch, { getD3Data } from '../console-monkey-patch';
import * as d3 from 'd3';

export default function Graph() {
    const [currentData, setCurrentData] = useState(null);
    const svgRef = useRef(null);
    const maxItems = 50;

    //Fetch D3 data
    useEffect(() => {
        // Initialize from any existing data on mount
        const initial = getD3Data();
        if (initial) setCurrentData(initial);

        const handleD3Update = () => {
            setCurrentData(getD3Data());
        };
        // Listen for custom d3Data events
        document.addEventListener('d3Data', handleD3Update);
        return () => document.removeEventListener('d3Data', handleD3Update);
    }, []);

    // Helper function to extract duration from log strings
    function LogToNum(input) {
        if (!input) return 0;
        if (typeof input === 'number') return input;

        const str = String(input).trim();
        const n = Number(str);
        if (!Number.isNaN(n)) return n;

        const stringArray = str.split(/(\s+)/);
        for (const item of stringArray) {
            if (item.startsWith('duration:')) {
                const val = Number(item.substring(9));
                return Number.isNaN(val) ? 0 : val;
            }
        }
        return 0;
    }

    // 3️⃣ D3 rendering effect
    useEffect(() => {
        if (!currentData) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        let w = svg.node().getBoundingClientRect().width - 40;
        let h = svg.node().getBoundingClientRect().height - 25;
        const margin = { left: 30, top: 3 };

        // Extract and convert duration values from string array to numbers
        const dataPoints = Array.isArray(currentData) 
            ? currentData.map(d => LogToNum(d)).slice(-maxItems)
            : [];

        if (dataPoints.length === 0) return;

        // const maxValue = Math.max(...dataPoints, 1);
        const maxValue = 0.4; // yScale for zoomed in graph

        const x = d3.scaleLinear().domain([0, dataPoints.length - 1]).range([0, w]);
        const y = d3.scaleLinear().domain([0, maxValue]).range([h, 0]);

        const chartGroup = svg
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Gradient
        const gradient = chartGroup
            .append('linearGradient')
            .attr('id', 'line-gradient')
            .attr('gradientUnits', 'userSpaceOnUse')
            .attr('x1', 0)
            .attr('y1', y(0))
            .attr('x2', 0)
            .attr('y2', y(maxValue));

        gradient
            .selectAll('stop')
            .data([
                { offset: '0%', color: 'green' },
                { offset: '100%', color: 'red' },
            ])
            .enter()
            .append('stop')
            .attr('offset', d => d.offset)
            .attr('stop-color', d => d.color);

        // Line
        const line = d3.line()
            .x((d, i) => x(i))
            .y(d => y(d))
            .curve(d3.curveMonotoneX);

        chartGroup
            .append('path')
            .datum(dataPoints)
            .attr('fill', 'none')
            .attr('stroke', 'url(#line-gradient)')
            .attr('stroke-width', 2)
            .attr('d', line);

        // Y axis
        chartGroup.append('g').call(d3.axisLeft(y));

    }, [currentData]);

    return (
        <div className="App container">
            <div className="row">
                <svg ref={svgRef} width="100%" height="200" className="border border-primary rounded p-2" style={{minWidth: '300px'}}></svg>
            </div>
            {currentData && (
                <div className="mt-2 small text-muted">
                    Latest value: {Array.isArray(currentData) ? LogToNum(currentData[currentData.length - 1]) : 'N/A'}
                </div>
            )}
        </div>
    );
}