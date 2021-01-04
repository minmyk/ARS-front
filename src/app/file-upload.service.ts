import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private httpClient: HttpClient) {
  }

  public upload(formData, apiUid): any {
    return this.httpClient.post<any>(environment.apiUrl + 'upload_file', formData, {params: {api_uid: apiUid},
      reportProgress: true,
      observe: 'events'
    });
  }
}
