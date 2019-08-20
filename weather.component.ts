import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApixuService } from "../apixu.service";
import { element } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  public weatherSearchForm: FormGroup;
  public weatherData: any;
  locationArray = [];
  constructor(private formBuilder: FormBuilder,
              private apixuService: ApixuService
    ) { }

  ngOnInit() {
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    });
  }
  sendToAPIXU(formValues) {
   // console.log(formValues.location);
  //  console.log(this.weatherData.location.name);
   // if(formValues.location = (this.weatherData.location.name)){
    if(localStorage.getItem('services_assigned') == null){

    this.getWeatherData(formValues);
      //console.log(this.weatherData);
      //console.log(this.weatherData.current.cloud);
      //console.log(this.weatherData.location.name);
      
   
   }else{

      let formvalue = formValues.location;
      let arr = JSON.parse(localStorage.getItem('services_assigned'));
      let findIndex = arr.findIndex(element => {
        return element.location.name.toLowerCase() == formvalue.toLowerCase();
      });
      if(findIndex > -1){
        this.weatherData = arr[findIndex];
      }else{
        //call api
        //setInterval(function(){ alert("Hello"); }, 3000);
        this.getWeatherData(formValues);
      }

   }

  }

  getWeatherData(formValues){

    this.apixuService   
      .getWeather(formValues.location)
      .subscribe((data) => {
        this.weatherData = data;
        this.locationArray.push(data);
        localStorage.setItem('services_assigned', JSON.stringify(this.locationArray));
        console.log(this.locationArray);
      })

  }
}
