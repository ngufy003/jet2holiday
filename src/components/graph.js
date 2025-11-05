import React, { useState, useEffect, useRef } from 'react';
import { getD3Data } from '../console-monkey-patch';
import * as d3 from 'd3';

/**
 * Graph
 * - Listens for d3Data events emitted by the app (getD3Data)
 * - Parses "duration:" values from the log string array
 * - Renders a simple D3 line chart into a local <svg> (via ref)
 */
export default function Graph() {
  // Holds the latest array returned by getD3Data() (Array of Strings)
  const [currentData, setCurrentData] = useState(null);

  // Ref to this component's <svg> so D3 draws only inside it
  const svgRef = useRef(null);

  // Maximum number of points to draw (keeps chart readable)
  const maxItems = 50;

  // On mount:
  // - initialize with any existing data
  // - subscribe to 'd3Data' events to update the graph whenever logs change
  useEffect(() => {
    const initial = getD3Data();
    if (initial) setCurrentData(initial);

    const handleD3Update = () => {
      const data = getD3Data();
      if (data) setCurrentData(data);
    };

    document.addEventListener('d3Data', handleD3Update);
    return () => document.removeEventListener('d3Data', handleD3Update);
  }, []);

  /**
   * LogToNum
   * Converts a log entry (string) into a number by extracting "duration:<number>"
   */
  function LogToNum(input) {
    if (!input) return 0;
    if (typeof input === 'number') return input;

    const str = String(input).trim();

    // If the whole string is numeric, return it directly
    const asNum = Number(str);
    if (!Number.isNaN(asNum)) return asNum;

    // Otherwise, look for a "duration:" token and parse its value
    const tokens = str.split(/(\s+)/);
    for (const t of tokens) {
      if (t.startsWith('duration:')) {
        const val = Number(t.substring('duration:'.length));
        return Number.isNaN(val) ? 0 : val;
      }
    }
    return 0;
  }

  // Render/Update chart whenever currentData changes
  useEffect(() => {
    if (!currentData) return;

    // Select only this component's SVG
    const svg = d3.select(svgRef.current);
    // Clear previous render
    svg.selectAll('*').remove();

    // Compute available drawing area
    const rect = svg.node().getBoundingClientRect();
    const w = rect.width - 40;   // inner width (minus right padding)
    const h = rect.height - 25;  // inner height (minus bottom padding)
    const margin = { left: 30, top: 3 };

    // Convert string logs to numeric durations and cap to the last maxItems entries
    const dataPoints = Array.isArray(currentData)
      ? currentData.map(LogToNum).slice(-maxItems)
      : [];

    if (dataPoints.length === 0) return;

    // Y-domain: auto-scale to data
    const maxValue = 0.4;

    // Scales for X (index) and Y (duration value)
    const x = d3.scaleLinear().domain([0, dataPoints.length - 1]).range([0, w]);
    const y = d3.scaleLinear().domain([0, maxValue]).range([h, 0]);

    // Chart group with margins applied
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // Vertical gradient for the line stroke (optional)
    const gradient = g
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

    // Line generator uses scales to convert data to pixels
    const line = d3
      .line()
      .x((_, i) => x(i))
      .y(d => y(d))
      .curve(d3.curveMonotoneX);

    // Draw the line
    g.append('path')
      .datum(dataPoints)
      .attr('fill', 'none')
      .attr('stroke', 'url(#line-gradient)')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Y axis (left)
    g.append('g').call(d3.axisLeft(y));
  }, [currentData]);

  // JSX: contains the SVG where D3 draws, and a small "latest value" readout
  return (
    <div className="App container">
      <div className="row">
        <svg
          ref={svgRef}
          width="100%"
          height="200"
          className="border border-primary rounded p-2"
          style={{ minWidth: '300px' }}
        />
      </div>
      {Array.isArray(currentData) && currentData.length > 0 && (
        <div className="mt-2 small text-muted">
          Latest duration: {LogToNum(currentData[currentData.length - 1])}
        </div>
      )}
    </div>
  );
}