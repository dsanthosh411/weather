import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Logs } from 'selenium-webdriver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather';
  public onlineOffline: boolean = navigator.onLine
  weatherDate: any = {};
  msg: string = "";
  msgValid: boolean = true;
  cardValid: boolean;
  data: any = [{ temp: "", msg: "", city: "", cardValid: undefined, msgValid: true, weatherDate: "", url: "" }, { temp: "", msg: "", city: "", cardValid: undefined, msgValid: true, weatherDate: "", url: "" }, { temp: "", msg: "", city: "", cardValid: undefined, msgValid: true, weatherDate: "", url: "" }, { temp: "", msg: "", city: "", cardValid: undefined, msgValid: true, weatherDate: "", url: "" },
   { temp: "", msg: "", city: "", cardValid: undefined, msgValid: true, weatherDate: "", url: "" }, { temp: "", msg: "", city: "", cardValid: undefined, msgValid: true, weatherDate: "", url: "" }, { temp: "", msg: "", city: "", cardValid: undefined, msgValid: true, weatherDate: "", url: "" }, { temp: "", msg: "", city: "", cardValid: undefined, msgValid: true, weatherDate: "", url: "" }, { temp: "", msg: "", city: "", cardValid: undefined, msgValid: true, weatherDate: "", url: "" }];
  constructor(public http: HttpClient) {
  }
  ngOnInit() {
    setInterval(() => {
      this.data.forEach((element, index) => {
        setTimeout(() => {
          this.getWeather(element.city,index);
        }, 5000);
      });
    }, 1800000)
  }
  getWeather(cityName, i) {
    this.data[i].msg = "city not found";
    this.data[i].msgValid = false;

    if (this.onlineOffline) {
      this.http.get("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=ac7740bbb6152f6b860b18c4fabadf4d&units=metric")
        .subscribe(
          (res) => {
            let weatherCity: any = {};
            weatherCity = res;
            console.log(weatherCity);
            this.data[i].weatherDate = weatherCity
            this.data[i].cardValid = true;
            this.data[i].msg = "sda";
            this.data[i].msgValid = true;
            this.data[i].url = weatherCity.weather[0].main + '.jpg';
            window.localStorage.setItem('weatherDetail', JSON.stringify(this.data));
          }
        );
    }
    else {
      let temp = window.localStorage.getItem('weatherDetail');
      let data = [];
      data = JSON.parse(temp);
      let finalData = data.find(x => x.city == cityName);
      if (typeof finalData != 'undefined') {
        this.data[i] = finalData;
      }
      else {
        this.data[i] = { temp: "", msg: "city not found", city: "", cardValid: false, msgValid: false, weatherDate: "", url: "" };
      }
    }
  }
  edit(i) {
    this.data[i].temp = "";
    this.data[i].msg = ""
    this.data[i].city = ""
    this.data[i].cardValid = false
    this.data[i].msgValid = true
    this.data[i].weatherDate = ""
    this.data[i].url = ""
  }
}
