import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UploadOutput, UploadInput, UploadFile, UploadProgress, humanizeBytes, UploaderOptions, UploadStatus } from 'ngx-uploader';
import { Observable } from 'rxjs/Observable';

import { NotificationsService } from 'angular2-notifications';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../../shared/services/auth.service';

import { Excel }           from '../../shared/models/excel.model';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-upload',
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.scss']
})
export class ExcelUploadComponent implements OnInit {

  /********** Upload Progress *************** */
  progress : number = 0;
  color = 'primary';
  mode = 'determinate';
  bufferValue = 100;
  speed: string;

  /********* Upload ***********/
  msgUpload : string;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  options: UploaderOptions;
  

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private auth: AuthService,
    private modalService: NgbModal,
    private notificationsService: NotificationsService,
  ) { 

    this.options = { concurrency: 1 };
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit() {
  }

  /*************************************
   FILE UPLOAD
  ***************************************/
  onUploadOutput(output: UploadOutput): void {

      let $this = this;

      let handle = setInterval(function(){

        if(output.file){

          $this.progress = output.file.progress.data.percentage;
          $this.speed = output.file.progress.data.speedHuman;

          if($this.progress == 100){
            $this.speed = "Processing file....";
            $this.files.forEach(file => {
              if(file.response){
                localStorage.setItem('currentModel', JSON.stringify(file.response.Model));
                $this.router.navigate(['excel/agent']);
              }
            });
            clearInterval(handle);
          }
        }

      }, 100);

      if (output.type === 'allAddedToQueue') {
        const event: UploadInput = {
          type: 'uploadAll',
          url: environment.apiUrl+"/upload",
          method: 'POST',
          headers: { 'Authorization': 'JWT ' + this.auth.token }, 
          data: { foo: 'bar' }
        };
        this.uploadInput.emit(event);
      } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') {
        this.files.push(output.file);
      } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
        // update current data in files array for uploading file
        const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
        this.files[index] = output.file;
      } else if (output.type === 'removed') {
        // remove file from array when removed
        this.files = this.files.filter((file: UploadFile) => file !== output.file);
      } else if (output.type === 'dragOver') {
        this.dragOver = true;
      } else if (output.type === 'dragOut') {
        this.dragOver = false;
      } else if (output.type === 'drop') {
        this.dragOver = false;
      }

    }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }

}
