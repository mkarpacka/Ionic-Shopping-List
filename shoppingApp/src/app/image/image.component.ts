import {Component, OnInit} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {File} from '@ionic-native/file/ngx';
import {Storage} from "@ionic/storage";
import {WebView} from '@ionic-native/ionic-webview/ngx';

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
        mediaType: this.camera.MediaType.PICTURE,
    };
    displayImage: any;
    private win: any = window;
    savedImagesNames: string[] = [];
    savedImages: any[] = [];

    constructor(private camera: Camera, private file: File, private storage: Storage, private webview: WebView) {
    }

    ngOnInit() {
        this.readFromStorage();
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
        const ble = await this.file.copyFile(tempBaseFilesystemPath, tempFilename,
            newBaseFilesystemPath, tempFilename);
        const storedPhoto = newBaseFilesystemPath + tempFilename;
        this.displayImage = this.win.Ionic.WebView.convertFileSrc(storedPhoto);
        this.savedImagesNames.push(storedPhoto);
        this.saveToStorage();
    }

    saveToStorage() {
        this.storage.set('image-urls', this.savedImagesNames);
    }

    readFromStorage() {
        this.storage.get('image-urls').then((val) => {
            if (val) {
                this.savedImages = [];
                this.savedImagesNames = val;
                console.log('names', this.savedImagesNames);
                this.displayImage = this.win.Ionic.WebView.convertFileSrc(this.savedImagesNames[this.savedImagesNames.length-1]);
                for (let i = 0; i < this.savedImagesNames.length; i++) {
                    this.savedImages.push(this.win.Ionic.WebView.convertFileSrc(this.savedImagesNames[i]));
                    console.log('images', this.savedImages);
                }
            }
            console.log(val);
        }).catch((err) => console.log(err));
    }

}
