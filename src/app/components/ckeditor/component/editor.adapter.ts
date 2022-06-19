import { OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { UploadRequest } from "src/app/entities/upload";
import { UploadService } from "src/app/services/upload/upload-file.service";

export class UploadAdapter  {
    unsubscribe$: Subject<void> = new Subject();
    
    constructor(
      private loader:any,
      private uploadService:UploadService
      ) {
    }

    upload() {
        let upload = new Promise((resolve, reject)=>{
        this.loader['file'].then(
            (data:any)=>{
                const request:UploadRequest = {
                    file: data
                }
                this.uploadService.Upload(request).
                    subscribe(
                        (result)=>{
                            resolve({ default: result })
                        },
                        (error)=>{
                            reject(data.msg);
                        }
                    );
            }
        );
        });
        return upload;
    }

    abort() {
        console.log("abort")
    }
    
}