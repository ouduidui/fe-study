import * as d3 from "d3";
import * as d3Tip from 'd3-tip';

const margin = {
  top: 80,
  right: 20,
  bottom: 30,
  left: 60
}

class CreateSimpleBarChart {
  constructor({data, elmId, containerWidth}) {
    this.data = data;
    this.elmId = elmId;
    this.containerWidth = containerWidth;
    this.width = containerWidth - margin.left - margin.right;
    this.height = 500 - margin.top - margin.bottom;

    this.init();
  }

  init() {
    this.chart = this.createChart();

    this.tip = this.createTip()
    this.chart.call(this.tip);

    this.x = this.createXAxis();
    this.y = this.createYAxis();

    this.g = this.chart
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')') // 设最外包层在总图上的相对位置

    this.renderAxis();
    this.renderBackgroundBar();
    this.renderBar();
    this.renderNum();
    this.renderTitle();
  }

  /**
   * 创建表格
   * @return {*}
   */
  createChart() {
    return d3.select(this.elmId)
      .attr('width', this.width + margin.left + margin.right)
      .attr('height', this.height + margin.top + margin.bottom);
  }

  /**
   * 设置X轴
   * @return {*}
   */
  createXAxis() {
    return d3
      .scaleBand()
      .rangeRound([0, this.width])
      .padding(0.1)
      .domain(this.data.map(d => d.letter))
  }

  /**
   * 设置Y轴
   * @return {*}
   */
  createYAxis() {
    return d3
      .scaleLinear()
      .rangeRound([this.height, 0])
      .domain([0, d3.max(this.data, (d) => d.frequency)])
  }

  createTip() {
    return d3Tip.default() // 设置tip
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html( d => {
        console.log(d, typeof d, JSON.stringify(d));
        return (
          '<strong>星期' +
          d.letter +
          "<br>空置率:</strong> <span style='color:#ffeb3b'>" +
          (d.frequency * 100).toFixed(2) +
          '%</span>'
        )
      })
  }

  renderAxis() {
    this.g.append('g') // 设置x轴
      .attr('class', 'axis axis-x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(this.x))

    this.g.append('g') // 设置y轴
      .attr('class', 'axis axis-y')
      .call(d3.axisLeft(this.y).ticks(10, '%'))
      .append('text')
      .attr('y', -16)
      .attr('dy', '.71em')
      .style('text-anchor', 'middle')
      .style('fill', '#fff')
      .text('空置率 (%)')
  }

  /**
   * 生成背景柱
   */
  renderBackgroundBar() {
    const stepArray = d3.ticks(0, d3.max(this.data, d => d.frequency), 10) // 用于生成背景柱
    const colors = ['#eee', '#fff'] // 用于生成背景柱

    this.g.append('g') // 设置背景柱
      .attr('class', 'bar-bg-bar')
      .selectAll('rect')
      .data(d3.range(stepArray.length - 1))
      .enter()
      .append('rect')
      .attr('stroke', 'none')
      .attr('stroke-width', 0)
      .attr('fill',  (d, i) => {
        return colors[i % 2]
      })
      .attr('x', 1)
      .attr('width', this.width)
      .attr('height',  (d, i) => {
        return this.y(stepArray[i]) - this.y(stepArray[i + 1])
      })
      .attr('y',  (d, i) => {
        return this.y((i + 1) * stepArray[1])
      })
  }

  renderBar() {
    this.g.selectAll('.bar') // 画柱图
      .data(this.data)
      .enter()
      .append('rect')
      .on('mouseover', this.tip.show)
      .on('mouseout', this.tip.hide)
      .attr('class', 'bar')
      .attr('fill', '#8a2be2')
      .attr('x',  (d) => {
        return this.x(d.letter)
      })
      .attr('y', this.height) // 控制动画由下而上
      .attr('width', this.x.bandwidth())
      .attr('height', 0) // 控制动画由下而上
      .transition()
      .duration(200)
      .ease(d3.easeBounceInOut)
      .delay( (d, i) => {
        return i * 200
      })
      .attr('y',  (d) => {
        return this.y(d.frequency)
      })
      .attr('height',  (d) => {
        return this.height - this.y(d.frequency)
      })
  }

  renderNum() {
    const barWidth = (this.width / this.data.length) * 0.9 // 用于绘制每条柱

    this.g.append('g') // 输出柱图上的数值
      .attr('class', 'bar-text')
      .selectAll('text')
      .data(this.data)
      .enter()
      .append('text')
      .attr('fill', 'orange')
      .attr('font-size', '14px')
      .attr('text-anchor', 'middle')
      .attr('x',  (d, i) => {
        return this.x(d.letter)
      })
      .attr('y',  (d) => {
        return this.y(d.frequency)
      })
      .attr('dx', barWidth / 2)
      .attr('dy', '1em')
      .text( (d) => {
        return (d.frequency * 100).toFixed(2) + '%'
      })
      .on('mouseover', this.tip.show)
      .on('mouseout', this.tip.hide)
  }

  renderTitle() {
    this.chart
      .append('g') // 输出标题
      .attr('class', 'bar-title')
      .append('text')
      .attr('fill', '#000')
      .attr('font-size', '16px')
      .attr('font-weight', '700')
      .attr('text-anchor', 'middle')
      .attr('x', this.containerWidth / 2)
      .attr('y', 20)
      .text('本周酒店房间空置率')
  }
}

export default CreateSimpleBarChart;
