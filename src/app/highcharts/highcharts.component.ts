import {Component, OnInit} from '@angular/core';

const Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);
declare var require: any;
export function highchartsFactory() {
  const hc = require('highcharts');
  const hm = require('highcharts/highcharts-more');
  const mr = require('highcharts/modules/solid-gauge');
  mr(hc);
  hm(hc);
  return hc;
}

@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.css']
})
export class HighchartsComponent implements OnInit {
  AfterContentInit() {
    Highcharts.chart('high_container', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: '图书类型数量'
      },
      tooltip: {
        pointFormat: '{series.time}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.time}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        data: [
          { time: '文学', y: 56 },
          { time: '小说', y: 24 },
          { time: '期刊', y: 10 },
          { time: '报纸', y: 10 },
        ]
      }]
    });
    Highcharts.chart('reader_container', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: '各时段读者注册人数'
      },
      tooltip: {
        pointFormat: '{series.time}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.time}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        data: [
          { time: '2019-01-01', y: 10 },
          { time: '2019-01-02', y: 11 },
          { time: '2019-01-03', y: 12 },
          { time: '2019-01-04', y: 13 },
        ]
      }],
      Highcharts
    });
  }
  Charts2(): void {
    // tslint:disable-next-line:no-shadowed-variable
    const Highcharts = require('highcharts');
    require('highcharts/modules/exporting')(Highcharts);
    // 创建图表
    Highcharts.chart('reader_container', {
      chart: {
        type: 'line'
      },
      title: {
        text: '各类型读者人数统计'
      },
      subtitle: {
        text: '来源： 读者注册情况'
      },
      xAxis: {
        categories: ['学生', '教师', '其他'],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: '读者人数（人）'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} 人</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: '读者人数',
        data: [64, 58, 61]
      }]
    });
  }

  ngOnInit() {
    this.AfterContentInit();
    this.Charts2();
  }
}
