import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpService
  ) { }

  getHeadline(){
    let url = 'api/mobilehome'
    return this.http.get(url);
  }
  getAllImage(id){
    let url = 'api/imagebyid?cari='+id;
    return this.http.get(url);
  }
  getAllReview(id){
    let url = 'api/reviewbyid?cari='+id;
    return this.http.get(url);
  }
  getPage(page, limit, cari?){
    let url = ""
    if(cari){
      url = 'api/getpage?page='+page+'&limit='+limit+'&cari='+cari;
    }else{
      url = 'api/getpage?page='+page+'&limit='+limit;
    }
    return this.http.get(url);
  }
  reviewstore(data){
    let url = 'api/reviewstore';
    return this.http.post(url, data);
  }
}
