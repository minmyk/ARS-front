import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {  ViewChild, ElementRef  } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { FileUploadService} from '../file-upload.service';
import {User} from '../models/user';
import { AuthService} from '../auth.service';
import {FileDownloadService} from '../file-download.service';
import { environment } from '../../environments/environment.prod';
import {AlertService} from '@full-fledged/alerts';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef;
  userFromApi: any;
  currentUser: User;
  datasetLoaded: boolean;
  files = [];
  selectedFile: any;
  userForm: FormGroup;
  loading = false;
  isModel: boolean;
  training: boolean;
  submitted = false;
  metrics: any;
  trainingButton: string;

  constructor(
    private fileUploadService: FileUploadService,
    private fileDownloadService: FileDownloadService,
    private alertService: AlertService,
    private authService: AuthService) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.loading = true;
    this.datasetLoaded = false;
    this.isModel = false;
    this.trainingButton = 'Begin training';
    this.userFromApi = JSON.parse(localStorage.getItem('currentUser'));
    const metricsObserver = {
      next: x => {
       if (x.error === '') {
         this.metrics = x;
       }
       else if (x.error === 'no model') {
         this.alertService.success('No model yet. Add data and start training!');
       }
       else {
         this.alertService.warning('Something went wrong. Please contact support.');
       }
      }
    };
    const statusObserver = {
      next: x => {
       if (x.status === 'todo') {
         this.training = false;
       }
       else if (x.status === 'new') {
         this.training = true;
         this.alertService.success('Training in progress!');
       }
       else if (x.status === 'failed') {
         this.alertService.warning('Training failed. Please check your file end try again.');
         this.training = false;
       }
       else if (x.status === 'done') {
         this.training = false;
         this.isModel = true;
         this.alertService.success('Training completed!');
       }
       else {
         this.training = false;
         this.alertService.warning('Something went wrong. Please contact support.');
        }
      }
    };
    this.authService.getTrainingStatus(this.userFromApi.apiUid).subscribe(statusObserver);
    this.authService.getMetrics(this.userFromApi.apiUid).subscribe(metricsObserver);
  }

  get f(): any {
    return this.userForm.controls;
  }

  get Map5(): string { return (this.metrics && this.metrics['map@5']) ? this.metrics['map@5'] : 'none'; }
  get Map10(): string { return (this.metrics && this.metrics['map@10']) ? this.metrics['map@10'] : 'none'; }
  get Recall100(): string { return (this.metrics && this.metrics['recall@100']) ? this.metrics['recall@100'] : 'none'; }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
    this.loading = true;
  }

  uploadFile(file): any {
    const formData = new FormData();
    formData.append('file', file.data, file.name);
    file.inProgress = true;
    this.fileUploadService.upload(formData, this.userFromApi.apiUid).pipe(
      map((event: any) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      })).subscribe((event: any) => {
      if (typeof (event) === 'object') {
        console.log(event.body);
        this.alertService.success('File uploaded!');
        this.datasetLoaded = true;
      }
    });
  }

  private uploadFiles(): void {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });
    this.alertService.success('Uploading started! Please wait...');
  }

  onClick(): void {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({data: file, inProgress: false, progress: 0});
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  onFileSelected(): void {
    console.log(this.selectedFile);
  }

  beginTraining(): any {
    if (this.datasetLoaded === false ){
      this.alertService.warning('Please load the dataset first!');
      return;
    }
    this.authService.beginTraining(this.userFromApi.apiUid).subscribe(data =>
      {
         if (data.status === 'ok') {
          this.training = true;
          this.trainingButton = 'Begin training';
          this.alertService.success('Training started! Reload page a few minutes later to download the model.');
        }
      }
      );
  }

  goToLink(): void {
    if (!this.isModel){
      this.alertService.warning('No trained model yet!');
      return;
    }
    const url = environment.apiUrl + 'download_model?api_uid=' + this.userFromApi.apiUid;
    window.open(url, '_blank');
  }
}
