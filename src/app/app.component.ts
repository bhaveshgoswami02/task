import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from './shared/services/api.service';

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
  displayedColumns: string[] = [
    'SSID', 'NAME', 'Cir_Name', 'Div_Name', 'Feeder_Name', 'date', 'IR', 'IY', 'IB', 'VR', 'VY', 'VB', 'KWR', 'KWY', 'KWB'
  ];
  dataSource: any = [];

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.loader = true;
    try {
      this.api.callBothAPIs().then(res => {
        this.data = res[0]
        this.staticData = res[1]
        this.loader = false;
        this.dataSource = this.mapData()
      })
    } catch (err) {
      this.loader = false;
      alert(err)
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
        Feeder_Name: ssData.FeederInfo.map((feeder: any) => feeder.name).join(', '),
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

  getHeaderName(id: string) {
    let data = [
      { title: 'SSID', value: 'SSID' },
      { title: 'Name', value: 'NAME' },
      { title: 'Cir Name', value: 'Cir_Name' },
      { title: 'Div Name', value: 'Div_Name' },
      { title: 'Feeder Name', value: 'Feeder_Name' },
      { title: 'Date', value: 'date' },
      { title: 'IR', value: 'IR' },
      { title: 'IY', value: 'IY' },
      { title: 'IB', value: 'IB' },
      { title: 'VR', value: 'VR' },
      { title: 'VY', value: 'VY' },
      { title: 'VB', value: 'VB' },
      { title: 'KWR', value: 'KWR' },
      { title: 'KWY', value: 'KWY' },
      { title: 'KWB', value: 'KWB' },
    ];
    let title: any = data.find(el => el.value == id)
    return title?.title || '-'
  }

}
