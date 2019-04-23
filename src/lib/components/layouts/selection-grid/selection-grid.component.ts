import {
  Component,
  ChangeDetectorRef,
  EventEmitter,
  Output,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { LayoutComponent } from '../layout.component';
import { ComponentRendererService } from '../../../services/component-renderer.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { empty } from 'rxjs';

@Component({
  selector: 'ren-selection-grid',
  templateUrl: './selection-grid.component.html',
  styleUrls: ['./selection-grid.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SelectionGridComponent extends LayoutComponent<any>
  implements OnInit {
  /** Required */

  @Input()
  ids: string[];

  @Input()
  images: string[];

  @Input()
  dialogTitle: string[];

  @Input()
  dialogText: string[];

  @Input()
  dialogFooter: string[];

  /** Optional */
  @Input()
  config: MatDialogConfig = {
    disableClose: true
  };

  @Input()
  selectable: boolean = true;

  @Input()
  emptyMessage: string = 'CORE.components.selection-grid.empty';

  /** Outputs */
  @Output()
  formSubmitted = new EventEmitter<any>();

  selectedItem: any;

  tiles: Array<{
    id: string;
    imageSrc: string;
    dialogTitle: string;
    dialogText: string;
    dialogFooter: string;
  }> = [];

  dialogRef: MatDialogRef<any>;

  constructor(
    protected componentResolver: ComponentRendererService,
    protected changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog
  ) {
    super(componentResolver, changeDetectorRef);
  }

  ngOnInit() {
    super.ngOnInit();
    this.ids = this.ids.filter(id => id !== null);
    this.tiles = new Array(this.ids.length);
    for (let i = 0; i < this.ids.length; i++) {
      this.tiles[i] = {
        id: this.ids[i],
        imageSrc: this.images[i],
        dialogTitle: this.dialogTitle[i],
        dialogText: this.dialogText[i],
        dialogFooter: this.dialogFooter ? this.dialogFooter[i] : null
      };
    }
  }

  selectTile() {
    if (this.selectedItem) {
      this.formSubmitted.emit(this.selectedItem.id || this.selectedItem);
    }
    this.closeDialog();
  }

  openDialog(tile) {
    this.selectedItem = tile;
    this.dialogRef = this.dialog.open(
      this.getCustomChildTemplate('content-' + tile.id),
      this.config
    );
  }

  closeDialog() {
    this.selectedItem = null;
    this.dialogRef.close();
  }
}
