<template>
    <PolarArea
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
    import { PolarArea } from 'vue-chartjs'
    import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, RadialLinearScale } from 'chart.js'

    ChartJS.register(Title, Tooltip, Legend, ArcElement, RadialLinearScale)

    export default {
      name: 'PolarAreaChart',
      components: { PolarArea },
      props: {
        chartId: {
          type: String,
          default: 'polar-area-chart'
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
            labels: [ 'Week 1', 'Week 2', 'Week 3', 'Week 4' ], // Labels for each polar area on the graph.
            datasets: [ { 
                label: 'Commits per week',  // Title of the graph.
                data: [10, 10, 20, 5] ,     // Values of the polar areas on the graph
                backgroundColor: [          // Colour of the polar areas. Can also use hex colour codes. Will colour areas in order of elements in array.
                                            // e.g, This will have areas of colour red, grey, blue, yellow
                    'orange',
                    'grey',
                    'blue',
                    'yellow',
                ], 
                borderColor: [
                    'black',
                    'white',
                ]     
            }, {
                label: 'Lines per Week',
                data: [20, 23, 45, 20],
                backgroundColor: 'red',
                borderColor: 'black'
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