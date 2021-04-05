import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import * as FusionCharts from "fusioncharts";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  count: any;
  dataSource: any;
  type: string;
  width: string;
  height: string;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getDashboardCount();
    this.type = "timeseries";
    this.width = "96%";
    this.height = "500";
    this.dataSource = {
      data: null,
      caption: {
        text: "Revenue Overview",
      },
      subcaption: {
        text: "Booking",
      },

      yAxis: [
        {
          plot: {
            value: "Booking",
            type: "column",
          },
          format: {
            prefix: "$",
          },
          title: "Booking",
        },
      ],
    };

    this.fetchData();
  }

  fetchData() {
    // var dataFetch:any;
    var jsonify = (res) => res.json();
    var schemaFetch = [
      {
        name: "Time",
        type: "date",
        // "format":"%y-%m-%d"
        format: "%d-%b-%y",
      },
      {
        name: "Booking",
        type: "number",
      },
    ];

    this.api.getRevenueData({}).subscribe((response: any) => {
      var dataFetch = response.data;
      Promise.all([dataFetch, schemaFetch]).then((res) => {
        // const [data, schema] = res;
        let data = res[0];
        let schema = res[1];
        const fusionDataStore = new FusionCharts.DataStore();
        const fusionTable = fusionDataStore.createDataTable(data, schema);
        this.dataSource.data = fusionTable;
      });
    });
  }

  getDashboardCount() {
    this.api.getDashboardCount().subscribe((response: any) => {
      this.count = response.data;
    });
  }
}
