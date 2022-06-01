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
  getTags(){
    let url = 'api/getTags';
    return this.http.get(url);
  }
  getPage(page, limit, cari?, tags?){
    let url = ""
    if(!cari){
      cari = ""
    }
    if(!tags){
      tags = ""
    }
    url = 'api/getpage?page='+page+'&limit='+limit+'&cari='+cari+'&tags='+tags;
    // if(cari){
    //   if(tags){
    //     url = 'api/getpage?page='+page+'&limit='+limit+'&cari='+cari;
    //   }else{
    //     url = 'api/getpage?page='+page+'&limit='+limit+'&cari='+cari;
    //   }
    // }else{
    //   url = 'api/getpage?page='+page+'&limit='+limit;
    // }
    return this.http.get(url);
  }
  getAcaraPage(page, limit, cari?, tags?){
    let url = ""
    if(!cari){
      cari = ""
    }
    if(!tags){
      tags = ""
    }
    url = 'api/getacara?page='+page+'&limit='+limit+'&cari='+cari+'&tags='+tags;
    return this.http.get(url);
  }
  reviewstore(data){
    // let url = 'api/reviewstore';
    let url = 'api/storereview?id_tempat='+data.id+'&name_review='+data.name+'&vote='+data.vote+'&email_review='+data.email+'&review_text='+data.message;
    return this.http.get(url);
  }
  login(data){
    let url = 'api/mobileactionlogin?email='+data.email+'&password='+data.password;
    return this.http.get(url);
  }
  register(data){
    let url = 'api/mobilepostRegistration?email='+data.email+'&name='+data.name+'&password='+data.password;
    return this.http.get(url);
  }
  countBookmark(email){
    let url = 'api/reviewbyemail?cari='+email;
    return this.http.get(url);
  }
}
