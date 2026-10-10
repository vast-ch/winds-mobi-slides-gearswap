// Chart colours to match the alpine styling in style.css
export default () => ({
  theme: 'base',
  themeVariables: {
    fontFamily: 'Barlow, sans-serif',
    xyChart: {
      backgroundColor: 'transparent',
      plotColorPalette: '#1f6f78',
      titleColor: '#16323a',
      xAxisLabelColor: '#16323a',
      yAxisLabelColor: '#16323a',
      xAxisLineColor: '#16323a',
      yAxisLineColor: '#16323a',
    },
  },
})
