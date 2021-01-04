import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {
  constructor(private httpClient: HttpClient) {
  }

  public download(apiUid): any {
    return this.httpClient.get<any>(environment.apiUrl + 'download_model', {params: {api_uid: apiUid}
    });
  }
}
