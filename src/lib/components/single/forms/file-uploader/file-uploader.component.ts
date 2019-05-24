import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  Input,
  forwardRef,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { FilePickerDirective, ReadFile } from 'ngx-file-helpers';
import { BaseComponent } from '../../../base.component';
import { CustomForm } from '../custom.form';

@Component({
  selector: 'ren-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => FileUploaderComponent)
    }
  ]
})
export class FileUploaderComponent extends CustomForm implements OnInit {
  // Documentation: https://www.npmjs.com/package/ngx-file-helpers

  @Input()
  label: string;

  @Input()
  buttonTitle: string;

  @Input()
  fabIcon: string;

  @Input()
  accept: string = '*';

  @Input()
  multiple: boolean = false;

  @Input()
  size: number = 25 * 1000 * 1000; // skip files which are >25mb

  @Input()
  isImage: boolean = true;

  @Input()
  imageSize: number[] = [150, 150];

  @ViewChild('myFilePicker')
  private filePicker: FilePickerDirective;

  file: ReadFile;

  constructor(protected changeDetectionRef: ChangeDetectorRef) {
    super(changeDetectionRef);
  }

  public patchValue(value: any) {
    this.filePick(value);
    this.changeDetectionRef.detectChanges();
  }

  filterFileBeforeReading() {
    // file is a native browser File
    return file => file.size < this.size;
  }

  filePick($event) {
    this.file = $event;
    if (this.isImage) {
      resizedataURL(
        this.file.content,
        this.imageSize[0],
        this.imageSize[1]
      ).then(data => {
        this.valueChanges.emit(data);
      });
    } else {
      this.valueChanges.emit(this.file.content);
    }
  }

  getMaxSize() {
    return this.size / 1000000 + 'MB';
  }
}

// Takes a data URI and returns the Data URI corresponding to the resized image at the wanted size.
function resizedataURL(datas, wantedWidth, wantedHeight) {
  return new Promise(async function(resolve, reject) {
    // We create an image to receive the Data URI
    const img = document.createElement('img');

    // When the event "onload" is triggered we can resize the image.
    img.onload = function() {
      // We create a canvas and get its context.
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // We set the dimensions at the wanted size.
      canvas.width = wantedWidth;
      canvas.height = wantedHeight;

      // We resize the image with the canvas method drawImage();
      ctx.drawImage(img, 0, 0, wantedWidth, wantedHeight);

      const dataURI = canvas.toDataURL();

      // This is the return of the Promise
      resolve(dataURI);
    };

    // We put the Data URI in the image's src attribute
    img.src = datas;
  });
} // Use it like : var newDataURI = await resizedataURL('yourDataURIHere', 50, 50);
