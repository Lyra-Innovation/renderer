import {
  Component,
  ChangeDetectionStrategy,
  Input,
  forwardRef,
  ViewEncapsulation
} from '@angular/core';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'ren-yt-video',
  templateUrl: './yt-video.component.html',
  styleUrls: ['./yt-video.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => YtVideoComponent)
    }
  ]
})
export class YtVideoComponent extends BaseComponent {
  /** Required */
  @Input()
  videoId: string;

  /** Optional */
  @Input()
  autoplay: boolean = true;

  @Input()
  width: number = 640;

  @Input()
  height: number = 360;

  getVideoSource(): string {
    return `https://www.youtube.com/embed/${this.videoId}?autoplay=${this.autoplay ? 1 : 0}&origin=${window.location.origin}`;
  }

  constructor() {
    super();
  }
}
