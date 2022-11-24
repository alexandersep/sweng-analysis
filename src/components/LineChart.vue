<template>
    <Line
      :chart-options = "chartOptions"
      :chart-data = "chartData"
      :chart-id = "chartId"
      :dataset-id-key = "datasetIdKey"
      :plugins = "plugins"
      :css-classes = "cssClasses"
      :styles = "styles"
      :width = "width"
      :height = "height"
    />
  </template>


<script>
    import { Line } from 'vue-chartjs'
    import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'

    ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

    export default {
      name: 'LineChart',
      components: { Line },
      props: {
        chartId: {
          type: String,
          default: 'line-chart'
        },
        datasetIdKey: {
          type: String,
          default: 'label'
        },
        width: {
          type: Number,
          default: 400  // Width of graph
        },
        height: {
          type: Number,
          default: 400  // Height of graph
        },
        cssClasses: {
          default: '',
          type: String
        },
        styles: {
          type: Object,
          default: () => {}
        },
        plugins: {
          type: Array,
          default: () => {}
        }
      },
      data() {
        return {
          chartData: {
            labels: [ 'Week 1', 'Week 2', 'Week 3', 'Week 4' ], // Labels for each point on the graph.
            datasets: [ { 
                label: 'Commits per Week',  // Title of the graph.
                data: [10, 5, 20, 3, 0] ,   // Values of the points on the graph
                backgroundColor: [          // Colour of the points. Can also use hex colour codes. Will colour points in order of elements in array.
                                            // e.g, This will have points of colour red, white, red, white, etc.
                    'red',
                    'white'
                ], 
                borderColor: [
                    'black',
                    'red',
                    'blue'
                ]      // First element colours the whole line and first point border. 
                       // Second element colours second point order, etc. (Same pattern as backgroundColor)
            }, {
                label: 'Pull Requests per Week',    
                data: [2, 3, 1, 5, 0],
                backgroundColor: 'yellow',
                borderColor: 'blue'
            } ]
          },
          chartOptions: {
            responsive: false,          // If false, sets the graph width and height according to props above.
                                        // Otherwise, fills whole width of page with equal height.
          }
        }
      }
    }
</script>