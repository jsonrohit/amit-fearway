import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-deshboard',
  templateUrl: './deshboard.component.html',
  styleUrls: ['./deshboard.component.scss']
})
export class DeshboardComponent {
  data:any = ''; 
   constructor(private userservice: UserService){
    this.userservice.getToken().subscribe(res=>{
      localStorage.setItem('userToken',JSON.stringify(res));
      this.getPersnalInfo();
    });
   }

  getPersnalInfo(){
    this.userservice.get('http://platformapi.immdemo.net/api/v1/Shopper?MemberId=1711141').subscribe(res => {
      if(res.errorcode == 0){
       this.data = res.message[0];
      //  console.log(this.data.Firstname);
      }else{
        alert('Data not found.');
      }
    })
  }

}