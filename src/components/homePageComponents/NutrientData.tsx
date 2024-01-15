// nutrientInfo.tsx
import React, { useState, useEffect, useRef } from 'react';
import './NutrientData.css'; // You may need to create a separate CSS file for this component
import * as d3 from 'd3';

import Graph from '../../assets/Graph.png';

interface NutrientInfo {
    servingSize: string;
    calories: string;
    carbohydrateContent: string;
    proteinContent: string;
    fatContent: string;
    saturatedFatContent: string;
    cholesterolContent: string;
    sodiumContent: string;
    fiberContent: string;
    sugarContent: string;
}

interface NutrientInfoProps {
    nutrients: NutrientInfo; // Type imported from RecipeJSON
}

interface NutrientPercentages {
    calories: number;
    protein: number;
    fat: number;
    cholesterol: number;
    sodium: number;
    sugar: number;
}

const NutrientInfo: React.FC<NutrientInfoProps> = ({ nutrients }) => {

    const [percentages, setPercentages] = useState<NutrientPercentages>();
    const d3Container = useRef(null);

    const containerRef = useRef<HTMLDivElement>(null);

    const calculatePercentages = () => { 
        const calories = Math.round((parseInt(nutrients.calories) / 2000) * 100);
        const protein = Math.round((parseInt(nutrients.proteinContent) / 50) * 100);
        const fat = Math.round((parseInt(nutrients.fatContent) / 65) * 100);
        const cholesterol = Math.round((parseInt(nutrients.cholesterolContent) / 300) * 100);
        const sodium = Math.round((parseInt(nutrients.sodiumContent) / 2400) * 100);
        const sugar = Math.round((parseInt(nutrients.sugarContent) / 50) * 100);

        setPercentages({
            calories: isNaN(calories) ? -0.1 : calories,
            protein: isNaN(protein) ? -0.1 : protein,
            fat: isNaN(fat) ? -0.1 : fat,
            cholesterol: isNaN(cholesterol) ? -0.1 : cholesterol,
            sodium: isNaN(sodium) ? -0.1 : sodium,
            sugar: isNaN(sugar) ? -0.1 : sugar
        });
    }

    useEffect(() => { 
        calculatePercentages();
    }, [ nutrients ]);

    useEffect(() => {
        const updateGraphSize = () => {
            if (containerRef.current && d3Container.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const containerHeight = containerRef.current.offsetHeight;
                const graphWidth = containerWidth - 50; // Adjusted for padding or margins
                const graphHeight = Math.max(0, containerHeight - 20); // Set to the same height as the container
    
                // Call your function to draw the graph with the new size
                drawGraph(graphWidth, graphHeight);
            }
        };
    
        // Set up a ResizeObserver to listen for changes in the container's size
        const resizeObserver = new ResizeObserver(updateGraphSize);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }
    
        // Initial draw
        updateGraphSize();
    
        // Cleanup
        return () => {
            if (containerRef.current) {
                resizeObserver.unobserve(containerRef.current);
            }
        };
    }, [percentages]);

    const drawGraph = (graphWidth: number, graphHeight: number) => {
        if (percentages && d3Container.current) {
            const data = Object.entries(percentages).map(([key, value]) => ({ nutrient: key, percentage: value }));
            const maxPercentage = Math.max(...Object.values(percentages));
            const yAxisMax = Math.max(maxPercentage + 10, 100);
    
            const margin = { top: 30, right: 20, bottom: 20, left: 40 },
                width = graphWidth,
                height = Math.max(0, graphHeight - margin.top - margin.bottom);
    
            d3.select(d3Container.current).selectAll("*").remove();
    
            const svg = d3.select(d3Container.current)
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);
    
            const x = d3.scaleBand()
                .domain(data.map(d => d.nutrient))
                .range([0, width])
                .padding(0.6);
    
            svg.append('g')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(x))
                .selectAll("text")
                .style("font-weight", "bold");
    
            const y = d3.scaleLinear()
                .domain([0, yAxisMax])
                .range([height, 0]);
    
            svg.append('g')
                .call(d3.axisLeft(y))
                .style("font-weight", "bold")
                .style("font-size", "12px");
    
            // Create the bars with initial height of 0, then animate to their respective heights
            svg.selectAll('.bar')
                .data(data)
                .enter().append('rect')
                .attr('class', 'bar')
                .attr('x', d => x(d.nutrient) || 0)
                .attr('width', x.bandwidth())
                .attr('y', Math.max(0, height)) // Start at the bottom of the graph
                .attr('height', 0) // Initial height is 0
                .attr('fill', '#035096')
                .transition() // Add transition
                .delay((_, i) => i * 50) // Delay based on index of the data
                .duration(1000) // Duration
                .attr('y', d => y(d.percentage))
                .attr('height', d => Math.max(0, height - y(d.percentage))); // Animate to final height
        
                // Add labels to bars
                svg.selectAll('.label')
                .data(data)
                .enter().append('text')
                .attr('class', 'label')
                .attr('x', (d) => (x(d.nutrient) ?? 0) + x.bandwidth() / 2)
                .attr('y', (d) => y(isNaN(d.percentage) ? 0 : d.percentage) - 5) // Adjust Y position for NaN values
                .attr('text-anchor', 'middle')
                .text((d) => d.percentage == -0.1 ? 'N/A' : `${d.percentage}%`) // Display 'N/A' for NaN values
                .style('opacity', 0) // Start with opacity 0 (invisible)
                .transition() // Add transition
                .delay((_, i) => (i * 50) + 400) // Delay of 1 second (after the bar animation)
                .duration(800) // Duration of the fade-in effect
                .style('opacity', 1); // Animate to full opacity
        }
    }
    

    return (
        <div className="nutrient-info-container" ref={containerRef}>
            {percentages && (Math.max(...Object.values(percentages)) >= 0) &&
                <>
                    <div ref={d3Container} />
                    <p className="diet-info-text">Percentages based on a 2000-calorie diet.</p>
                </>
                
            } 
            
            {percentages && (Math.max(...Object.values(percentages)) < 0) &&
                <div className="no-data-container">
                    <img src={Graph} alt="Graph" className='graph-photo'/>
                    <p className="no-data-text">No data available.</p>
                </div>
            }
            
        </div>
    );
};

export default NutrientInfo;
