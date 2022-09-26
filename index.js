import { select, csv, scaleLinear, max, scaleBand, axisLeft, axisTop } from 'd3';

const svg = select('svg');


const width = +svg.attr('width');
const height = +svg.attr('height');
const margin = { top: 50, left: 120, bottom: 15, right:15 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.top;

function render(data) {
  const xValue =  d => d.population
  const yValue = d => d.country
  
  const xScale = scaleLinear()
  								.domain([0, max(data, xValue)])
  								.range([0, innerWidth])
  								
  const yScale = scaleBand()
  								.domain(data.map(yValue))
  								.range([0, innerHeight])
  								.padding(0.25)
  
  const g = svg.append('g')
  						 .attr('transform',`translate(${margin.left},${margin.top})`)
  const leftAxis = axisLeft(yScale)
  const topAxis = axisTop(xScale)
  topAxis.ticks(10)
  g.append('g').call(leftAxis)
  g.append('g').call(topAxis)
  	.attr('transform',`translate(0,0)`)

  g
    .selectAll('rect')
    .data(data)
  	.enter()
  	.append('rect')
  	.attr('y', d => yScale(yValue(d)))
  	.attr('width', d => xScale(xValue(d)))
  	.attr('height', yScale.bandwidth())
  	.append('title')
  	.text(xValue)
  	.attr('class', 'tip')
	
  const populationNumber = document.querySelectorAll('.tip')

		populationNumber.forEach(addComma)

		function addComma(item) {
  	let pop = parseInt(item.innerHTML)
		return item.innerHTML = pop.toLocaleString()  
}

}
csv('data.csv').then(data => {
  data.forEach(d => {
    d.population = +d.population*1000
  })
  render(data) 
})


