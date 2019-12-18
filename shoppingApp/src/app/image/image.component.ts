import {Component, OnInit} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {File} from '@ionic-native/file/ngx';
import {Storage} from "@ionic/storage";
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss'],
})

export class ImageComponent implements OnInit {

    cameraOptions: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    };
    displayImage: any;
    private win: any = window;
    savedImagesNames: string[] = [];

    constructor(private camera: Camera, private file: File, private storage: Storage, private webview: WebView) {
    }

    ngOnInit() {
        // this.displayImage = this.win.Ionic.WebView.convertFileSrc('file://data/user/0/io.ionic.starter.files/1576678019576.jpg');
        // if (this.savedImagesNames.length > 0) {
        //     this.readFromStorage();
        // }
    }

    takeSnap() {
        this.camera.getPicture(this.cameraOptions).then((imageData) => {
            const tempFilename = imageData.substr(imageData.lastIndexOf('/') + 1);
            const tempBaseFilesystemPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
            const newBaseFilesystemPath = this.file.dataDirectory;
            this.fun(tempBaseFilesystemPath, tempFilename, newBaseFilesystemPath);
        }, (err) => {

            console.log(err);
            // Handle error
        });
    }

    async fun(tempBaseFilesystemPath, tempFilename,
              newBaseFilesystemPath) {
        console.log(tempBaseFilesystemPath);
        console.log(tempFilename);
        console.log(newBaseFilesystemPath);
        const ble = await this.file.copyFile(tempBaseFilesystemPath, tempFilename,
            newBaseFilesystemPath, tempFilename);
        console.log(ble);
        const storedPhoto = newBaseFilesystemPath + tempFilename;
        this.displayImage = this.webview.convertFileSrc(storedPhoto);
        this.savedImagesNames.push(storedPhoto);
        this.saveToStorage();
    }

    saveToStorage() {
        this.storage.set('image-urls', this.savedImagesNames);
    }

    // readFromStorage() {
    //     this.storage.get('image-urls').then((val) => {
    //         if (val) this.savedImagesNames = val;
    //     }).catch((err) => console.log(err));
    // }

}
