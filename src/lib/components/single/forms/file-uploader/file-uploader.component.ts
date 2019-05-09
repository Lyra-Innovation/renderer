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
    this.valueChanges.emit(this.file);
  }

  getMaxSize() {
    return this.size / 1000000 + 'MB';
  }
}
