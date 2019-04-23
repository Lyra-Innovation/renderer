import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  Input
} from '@angular/core';
import { BaseComponent } from '../../../base.component';
import { Minigame } from '../minigame';

@Component({
  selector: 'ren-zop-game',
  templateUrl: './zop-game.component.html',
  styleUrls: ['./zop-game.component.css']
})
export class ZopGameComponent extends BaseComponent
  implements Minigame, AfterViewInit, OnDestroy {
  @Input()
  maxScore: number = 15;

  @Input()
  images: string;
  @Input()
  colors: string;

  @ViewChild('zopCanvas')
  canvas: ElementRef;

  @Output()
  gameFinished = new EventEmitter<void>();

  interval: any;

  score: number = 0;

  constructor(protected changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  getScore(totalTime: number, timeSpent: number): { win: boolean; score: any } {
    return {
      win: this.score >= this.getMaxScore(),
      score: this.score
    };
  }

  ngAfterViewInit(): void {
    this.initGame();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    clearInterval(this.interval);
  }

  getMaxScore(): number {
    return this.maxScore;
  }

  setScore(score: number) {
    this.score = score;
    if (score >= this.getMaxScore()) {
      this.gameFinished.emit();
    }
  }

  // tslint:disable:no-bitwise

  initGame() {
    const canvasElement = <HTMLCanvasElement>this.canvas.nativeElement;
    const ctx = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');
    ctx.canvas.width = ctx.canvas.clientWidth;
    ctx.canvas.height = ctx.canvas.clientHeight;

    let X, Y;

    let score = 0;
    let highestRow = 0;
    let isSelecting = 0;

    // initialize grid
    const W = ctx.canvas.width;
    const H = ctx.canvas.height;
    const dotSize = Math.min(W, H) / 7;
    const L = W / 2 - dotSize * 3 + dotSize / 2;
    const R = H / 2 - dotSize * 3;

    const colorsAux = this.colors.split(',');
    const colors = {};
    const images = this.images.split(',').map((img, index) => {
      const image = new Image();
      image.src = img;
      colors[img] = colorsAux[index];
      return image;
    });

    const dots = [];
    let selected = [];
    for (let x = 0; x < 6; x++) {
      for (let y = 0; y < 6; y++) {
        dots.push({
          o: images[(Math.random() * 5) | 0],
          Y: R + y * dotSize,
          x: L + x * dotSize,
          y: R + y * dotSize,
          r: y,
          ctx: x
        });
      }
    }

    canvasElement.addEventListener('mousedown', () => (isSelecting = 1), false);
    canvasElement.addEventListener(
      'touchstart',
      () => (isSelecting = 1),
      false
    );

    const touchend = function(setScore) {
      // ignore single selections
      if (!selected[1]) {
        selected = [];
      }

      // respawn dots above board
      for (let i = 0; i < selected.length; i++) {
        const dot = selected[i];
        if (dot.r >= 0) {
          setScore(score++);
          dot.r -= highestRow + 1;
          dot.y = R + dot.r * dotSize;
          dot.o = images[(Math.random() * 5) | 0];
        }
      }

      highestRow = isSelecting = 0;
      selected = [];
    };
    canvasElement.addEventListener(
      'touchend',
      () => touchend(s => this.setScore(s)),
      false
    );
    canvasElement.addEventListener(
      'mouseup',
      () => touchend(s => this.setScore(s)),
      false
    );

    const move = function(event) {
      const rect = event.target.getBoundingClientRect();
      // normalize touch inputs
      if (
        event.targetTouches &&
        event.targetTouches.length > 0 &&
        event.targetTouches[0].pageY
      ) {
        alert(event.targetTouches[0].pageY + ',' + rect.top);
        X = event.targetTouches[0].pageX - rect.left;
        isSelecting = Y = event.targetTouches[0].pageY - rect.top;
      } else {
        X = event.pageX - rect.left;
        Y = event.pageY - rect.top;
      }

      // select dots
      if (isSelecting) {
        for (let i = 0; i < dots.length; i++) {
          const dot = dots[i];

          // skip if dot is not the same color or isn't neighboring
          if (
            selected.length === 0 ||
            (selected[0] &&
              selected[0].o === dot.o &&
              (selected[0] &&
                Math.abs(
                  Math.abs(selected[0].r - dot.r) -
                    Math.abs(selected[0].ctx - dot.ctx)
                ) === 1))
          ) {
            if (
              Math.abs(X - dot.x) < dotSize / 2 &&
              Math.abs(Y - dot.y) < dotSize / 2
            ) {
              if (!selected.includes(dot)) {
                selected.unshift(dot);
                highestRow = Math.max(dot.r, highestRow);
              } else if (selected[1] === dot) {
                selected.shift();
              }
            }
          }
        }
      }
    };
    canvasElement.addEventListener('mousemove', e => move(e), false);
    canvasElement.addEventListener('touchmove', e => move(e), false);
    /**
     * By Ken Fyrstenberg Nilsen
     *
     * drawImageProp(context, image [, x, y, width, height [,offsetX, offsetY]])
     *
     * If image and context are only arguments rectangle will equal canvas
     */
    function drawImageProp(
      context,
      img,
      x,
      y,
      w,
      h,
      offsetX = 0.5,
      offsetY = 0.5
    ) {
      if (arguments.length === 2) {
        x = y = 0;
        w = context.canvas.width;
        h = context.canvas.height;
      }

      // default offset is center
      offsetX = typeof offsetX === 'number' ? offsetX : 0.5;
      offsetY = typeof offsetY === 'number' ? offsetY : 0.5;

      // keep bounds [0.0, 1.0]
      if (offsetX < 0) {
        offsetX = 0;
      }
      if (offsetY < 0) {
        offsetY = 0;
      }
      if (offsetX > 1) {
        offsetX = 1;
      }
      if (offsetY > 1) {
        offsetY = 1;
      }

      // tslint:disable:prefer-const
      let iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r, // new prop. width
        nh = ih * r, // new prop. height
        cx,
        cy,
        cw,
        ch,
        ar = 1;

      // decide which gap to fill
      // tslint:disable:curly
      if (nw < w) ar = w / nw;
      if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh; // updated
      nw *= ar;
      nh *= ar;

      // calc source rectangle
      cw = iw / (nw / w);
      ch = ih / (nh / h);

      cx = (iw - cw) * offsetX;
      cy = (ih - ch) * offsetY;

      // make sure source rectangle is valid
      if (cx < 0) cx = 0;
      if (cy < 0) cy = 0;
      if (cw > iw) cw = iw;
      if (ch > ih) ch = ih;

      // fill image in dest. rectangle
      context.drawImage(img, cx, cy, cw, ch, x, y, w, h);
    }

    this.interval = setInterval(function() {
      // clear canvas
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = dotSize / 6;
      ctx.lineJoin = 'round';

      // physics and painting
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        // if p doesn't have a neighbor below, move it down
        let hasBelow = 0;
        for (let j = 0; j < dots.length; j++) {
          const dot1 = dots[j];
          if (dot.r + 1 === dot1.r && dot.ctx === dot1.ctx) {
            hasBelow = 1;
          }
        }
        if (!hasBelow && dot.r !== 5) {
          dot.r++;
          dot.Y = R + dot.r * dotSize;
        }

        // falling animation
        if (dot.y !== dot.Y) {
          const dir = dot.y > dot.Y ? -1 : 1;
          dot.y += dot.T * dir;
          dot.T *= dot.s && !dot.t ? 0.5 : 1.5;

          if (~dir && dot.y >= dot.Y) {
            dot.y = dot.Y;
          } else if (!~dir && dot.y <= dot.Y) {
            dot.y = dot.Y;
          }

          // flidot udot/down
          if (!dot.s && !dot.t && dot.y === dot.Y) {
            dot.s = 1;
            dot.Y -= dotSize / 3;
            dot.T = dotSize / 5;
          } else if (dot.s && !dot.t && dot.y === dot.Y) {
            dot.t = 1;
            dot.T = dotSize / 15;
            dot.Y += dotSize / 3;
          }
        } else {
          dot.T = dotSize / 15;
          dot.t = dot.s = 0;
        }

        // paint
        drawImageProp(
          ctx,
          dot.o,
          dot.x - dotSize / 4,
          dot.y - dotSize / 4,
          dotSize / 1.5,
          dotSize / 1.5
        );
        ctx.save();
        ctx.restore();
      }

      // paint selection lines
      if (selected[0]) {
        ctx.strokeStyle = '#00436d';
        ctx.beginPath();
        ctx.moveTo(X, Y);
        for (let i = 0; i < selected.length; i++) {
          const dot = selected[i];
          ctx.lineTo(dot.x, dot.y);
        }
        ctx.stroke();
      }
    }, 33);
  }
}
