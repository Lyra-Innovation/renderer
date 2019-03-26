import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  AfterViewInit,
  Input,
  forwardRef
} from '@angular/core';
import { LayoutComponent } from '../layout.component';
import { ComponentRendererService } from '../../../services/component-renderer.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'ren-dialog-launcher',
  templateUrl: './dialog-launcher.component.html',
  styleUrls: ['./dialog-launcher.component.css'],
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => DialogLauncherComponent)
    }
  ]
})
export class DialogLauncherComponent
  extends LayoutComponent<'launcher' | 'content'>
  implements AfterViewInit {
  // Reference: https://material.angular.io/components/dialog/api

  /** Required */
  @Input()
  config: MatDialogConfig = {
    disableClose: true
  };

  /** Optional */
  @Input()
  showDialogOnStart: boolean = false;

  @Input()
  disabled: boolean = false;

  /** Outputs */
  @Output()
  dialogLaunched = new EventEmitter<void>();

  @Output()
  dialogClosed = new EventEmitter<any>();

  dialogRef: MatDialogRef<any>;

  constructor(
    protected componentResolver: ComponentRendererService,
    protected changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog
  ) {
    super(componentResolver, changeDetectorRef);
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    if (this.showDialogOnStart) {
      setTimeout(() => {
        this.openDialog();
      });
    }
  }

  openDialog() {
    if (this.disabled) {
      return;
    }

    this.dialogRef = this.dialog.open(
      this.getCustomChildTemplate('content'),
      this.config
    );
    this.dialogLaunched.emit();

    const sub = this.dialogRef
      .afterClosed()
      .subscribe(result => this.dialogClosed.emit(result));
    this.subscriptions.push(sub);
  }

  protected onBubbleEvent(name: string, params: any, event: any) {
    switch (name) {
      case 'CloseDialog':
        this.dialogRef.close(params);
        break;
      default:
        break;
    }
  }
}
