import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'task';
  loader: boolean = false;
  data = [];
  staticData: any = [];
  displayedColumns: string[] = ['SSID', 'NAME', 'Cir_Name', 'Div_Name', 'Feeder_Name', 'date', 'IR', 'IY', 'IB', 'VR', 'VY', 'VB', 'KWR', 'KWY', 'KWB'];
  dataSource: any = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getData()
    this.getStaticData()
  }

  async getData() {
    try {
      this.loader = true;
      let url = './assets/json/input_data_json.json'
      const res: any = await this.http.get(url).toPromise()
      this.data = res
      console.log(res)
      this.getStaticData()
    } catch (err) {
      this.loader = false;
    }
  }

  async getStaticData() {
    try {
      let url = './assets/json/input_static_json.json'
      const res = await this.http.get(url).toPromise()
      console.log(res)
      this.staticData = res
      this.dataSource = this.mapData()
      console.log('mappedData', this.dataSource)
      this.loader = false;
    } catch (err) {
      this.loader = false;
    }
  }

  mapData() {
    return this.data.map((el: any) => {
      let ssData = this.staticData.find((el: any) => el.SSID == el.SSID)
      return {
        SSID: el.SSID,
        NAME: ssData.NAME,
        Cir_Name: ssData.Cir_Name,
        Div_Name: ssData.Div_Name,
        Feeder_Name: '',
        date: el.message.msgts,
        IR: el.message.data[1][1],
        IY: el.message.data[3][1],
        IB: el.message.data[2][1],
        VR: el.message.data[4][1],
        VY: el.message.data[5][1],
        VB: el.message.data[6][1],
        KWR: el.message.data[7][1],
        KWY: el.message.data[8][1],
        KWB: el.message.data[9][1],
      }
    })
  }

}
