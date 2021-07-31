import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  NgZone,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';

import {HomeGridAction, HomeGridItem} from './home.model';

@Component({
  selector: 'web-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('canvas')
  public canvas: ElementRef<HTMLCanvasElement>;
  context: CanvasRenderingContext2D;
  BACKGROUND_COLOR      = 'rgba(2, 119, 189, 1)';
  PARTICLE_RADIUS       = 1;
  G_POINT_RADIUS        = 10;
  G_POINT_RADIUS_LIMITS = 65;

  bufferCvs;
  bufferCtx: CanvasRenderingContext2D;
  screenWidth;
  screenHeight;
  mouse = new Vector();
  gravities = [];
  particles = [];
  grad;
  control = {
    particleNum: 100
  };
  public isBrowser = false;

  public items: HomeGridItem[];
  public headers: HomeGridItem[];

  public spacer: '5px';

  public basis = '20em';

  public xBuffer: 56;
  public yBuffer: 48;

  constructor(private ngZone: NgZone, @Inject(PLATFORM_ID) private platformId: Record<string, unknown>) {
    this.items = this.getHomeGridItems(10);
    this.headers = [
      {
        img: `https://picsum.photos/id/482/1920/1080`,
        imgAlt: `Random Photo`,
      }
    ];
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  public ngAfterViewInit(): void {
    if (this.isBrowser && this.canvas) {
      this.bufferCvs = document.createElement('canvas');
      this.resize(null);
      this.addParticle(this.control.particleNum);
      this.ngZone.runOutsideAngular(() => this.loop());
    }
  }

  public resize(e) {
    // Make it visually fill the positioned parent
    this.canvas.nativeElement.style.width ='100%';
    this.canvas.nativeElement.style.height='100%';

    // ...then set the internal size to match
    this.canvas.nativeElement.width  = this.canvas.nativeElement.offsetWidth;
    this.canvas.nativeElement.height = this.canvas.nativeElement.offsetHeight;

    this.screenWidth  = this.canvas.nativeElement.width;
    this.screenHeight = this.canvas.nativeElement.height;
    this.bufferCvs.width  = this.screenWidth;
    this.bufferCvs.height = this.screenHeight;

    this.context   = this.canvas.nativeElement.getContext('2d');
    this.bufferCtx = this.bufferCvs.getContext('2d');
  }

  //TODO: offset 56 x to the left when menu is docked on the side and 48 y the height of the top bar
  private calculateXBuffer(x): number {
    return x;
  }

  private calculateYBuffer(y): number {
    return y - 48;
  }

  public mouseMove(e) {
    this.mouse.set(this.calculateXBuffer(e.clientX), this.calculateYBuffer(e.clientY));

    let i, g, hit = false;
    for (i = this.gravities.length - 1; i >= 0; i--) {
      g = this.gravities[i];
      if ((!hit && g.hitTest(this.mouse)) || g.dragging)
        g.isMouseOver = hit = true;
      else
        g.isMouseOver = false;
    }

    this.canvas.nativeElement.style.cursor = hit ? 'pointer' : 'default';
  }

  public mouseDown(e) {
    for (let i = this.gravities.length - 1; i >= 0; i--) {
      if (this.gravities[i].isMouseOver) {
        this.gravities[i].startDrag(this.mouse);
        return;
      }
    }
    this.gravities.push(new GravityPoint(this.calculateXBuffer(e.clientX), this.calculateYBuffer(e.clientY), this.G_POINT_RADIUS, {
      particles: this.particles,
      gravities: this.gravities
    }));
  }

  public mouseUp(e) {
    for (let i = 0, len = this.gravities.length; i < len; i++) {
      if (this.gravities[i].dragging) {
        this.gravities[i].endDrag();
        break;
      }
    }
  }

  public doubleClick(e) {
    for (let i = this.gravities.length - 1; i >= 0; i--) {
      if (this.gravities[i].isMouseOver) {
        this.gravities[i].collapse();
        break;
      }
    }
  }

  public handleGridAction(action: HomeGridAction) {
    alert(`${action.name} selected`);
  }

  private getHomeGridItems(length): HomeGridItem[] {
    return Array.from({ length }, (v, index) => {
      return {
        icon: `icon ${index}`,
        title: `Heading  ${index}`,
        subTitle: `Sub Heading  ${index}`,
        img: 'https://picsum.photos/600/400?grayscale' + `&random=${index}`,
        imgAlt: `Random Photo  ${index}`,
        content: ` ${index} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        actions: [
          {
            name: `${index} action1`,
            action: `#${index}`
          },
          {
            name: `${index} action2`,
            action: `#${index}`
          }
        ]
      }
    })
  }

  private addParticle(num) {
    let i, p;
    for (i = 0; i < num; i++) {
      p = new Particle(
        Math.floor(Math.random() * this.screenWidth - this.PARTICLE_RADIUS * 2) + 1 + this.PARTICLE_RADIUS,
        Math.floor(Math.random() * this.screenHeight - this.PARTICLE_RADIUS * 2) + 1 + this.PARTICLE_RADIUS,
        this.PARTICLE_RADIUS
      );
      p.addSpeed(Vector.random());
      this.particles.push(p);
    }
  }

  private removeParticle(num) {
    if (this.particles.length < num) num = this.particles.length;
    for (let i = 0; i < num; i++) {
      this.particles.pop();
    }
  }

  private loop() {
    let i, len, g, p;

    this.context.save();
    this.context.fillStyle = this.BACKGROUND_COLOR;
    this.context.fillRect(0, 0, this.screenWidth, this.screenHeight);
    this.context.fillStyle = this.grad;
    this.context.fillRect(0, 0, this.screenWidth, this.screenHeight);
    this.context.restore();

    for (i = 0, len = this.gravities.length; i < len; i++) {
      g = this.gravities[i];
      if (g.dragging) g.drag(this.mouse);
      g.render(this.context);
      if (g.destroyed) {
        this.gravities.splice(i, 1);
        len--;
        i--;
      }
    }

    this.bufferCtx.save();
    this.bufferCtx.globalCompositeOperation = 'destination-out';
    this.bufferCtx.globalAlpha = 0.35;
    this.bufferCtx.fillRect(0, 0, this.screenWidth, this.screenHeight);
    this.bufferCtx.restore();

    len = this.particles.length;
    this.bufferCtx.save();
    this.bufferCtx.fillStyle = this.bufferCtx.strokeStyle = '#fff';
    this.bufferCtx.lineCap = this.bufferCtx.lineJoin = 'round';
    this.bufferCtx.lineWidth = this.PARTICLE_RADIUS * 2;
    this.bufferCtx.beginPath();
    for (i = 0; i < len; i++) {
      p = this.particles[i];
      p.update();
      this.bufferCtx.moveTo(p.x, p.y);
      this.bufferCtx.lineTo(p._latest.x, p._latest.y);
    }
    this.bufferCtx.stroke();
    this.bufferCtx.beginPath();
    for (i = 0; i < len; i++) {
      p = this.particles[i];
      this.bufferCtx.moveTo(p.x, p.y);
      this.bufferCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
    }
    this.bufferCtx.fill();
    this.bufferCtx.restore();

    // バッファをキャンバスに描画
    this.context.drawImage(this.bufferCvs, 0, 0);

    requestAnimationFrame(this.loop.bind(this));
  };

}


/**
 * Vector
 */
function Vector(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}

Vector.add = function(a, b) {
  return new Vector(a.x + b.x, a.y + b.y);
};

Vector.sub = function(a, b) {
  return new Vector(a.x - b.x, a.y - b.y);
};

Vector.scale = function(v, s) {
  return v.clone().scale(s);
};

Vector.random = function() {
  return new Vector(
    Math.random() * 2 - 1,
    Math.random() * 2 - 1
  );
};

Vector.prototype = {
  set: function(x, y) {
    if (typeof x === 'object') {
      y = x.y;
      x = x.x;
    }
    this.x = x || 0;
    this.y = y || 0;
    return this;
  },

  add: function(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  },

  sub: function(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  },

  scale: function(s) {
    this.x *= s;
    this.y *= s;
    return this;
  },

  length: function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },

  lengthSq: function() {
    return this.x * this.x + this.y * this.y;
  },

  normalize: function() {
    const m = Math.sqrt(this.x * this.x + this.y * this.y);
    if (m) {
      this.x /= m;
      this.y /= m;
    }
    return this;
  },

  angle: function() {
    return Math.atan2(this.y, this.x);
  },

  angleTo: function(v) {
    const dx = v.x - this.x,
      dy = v.y - this.y;
    return Math.atan2(dy, dx);
  },

  distanceTo: function(v) {
    const dx = v.x - this.x,
      dy = v.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
  },

  distanceToSq: function(v) {
    const dx = v.x - this.x,
      dy = v.y - this.y;
    return dx * dx + dy * dy;
  },

  lerp: function(v, t) {
    this.x += (v.x - this.x) * t;
    this.y += (v.y - this.y) * t;
    return this;
  },

  clone: function() {
    return new Vector(this.x, this.y);
  },

  toString: function() {
    return '(x:' + this.x + ', y:' + this.y + ')';
  }
};




/**
 * GravityPoint
 */
function GravityPoint(x, y, radius, targets) {
  Vector.call(this, x, y);
  this.radius = radius;
  this.currentRadius = radius * 0.5;

  this._targets = {
    particles: targets.particles || [],
    gravities: targets.gravities || []
  };
  this._speed = new Vector();
}

GravityPoint.RADIUS_LIMIT = 65;
GravityPoint.interferenceToPoint = true;

GravityPoint.prototype = (function(o) {
  const s = new Vector(0, 0);
  let p;
  for (p in o) s[p] = o[p];
  return s;
})({
  gravity:       0.05,
  isMouseOver:   false,
  dragging:      false,
  destroyed:     false,
  _easeRadius:   0,
  _dragDistance: null,
  _collapsing:   false,

  hitTest: function(p) {
    return this.distanceTo(p) < this.radius;
  },

  startDrag: function(dragStartPoint) {
    this._dragDistance = Vector.sub(dragStartPoint, this);
    this.dragging = true;
  },

  drag: function(dragToPoint) {
    this.x = dragToPoint.x - this._dragDistance.x;
    this.y = dragToPoint.y - this._dragDistance.y;
  },

  endDrag: function() {
    this._dragDistance = null;
    this.dragging = false;
  },

  addSpeed: function(d) {
    this._speed = this._speed.add(d);
  },

  collapse: function(e) {
    this.currentRadius *= 1.75;
    this._collapsing = true;
  },

  render: function(ctx) {
    if (this.destroyed) return;

    const particles = this._targets.particles;
    let i, len;

    for (i = 0, len = particles.length; i < len; i++) {
      particles[i].addSpeed(Vector.sub(this, particles[i]).normalize().scale(this.gravity));
    }

    this._easeRadius = (this._easeRadius + (this.radius - this.currentRadius) * 0.07) * 0.95;
    this.currentRadius += this._easeRadius;
    if (this.currentRadius < 0) this.currentRadius = 0;

    if (this._collapsing) {
      this.radius *= 0.75;
      if (this.currentRadius < 1) this.destroyed = true;
      this._draw(ctx);
      return;
    }

    const gravities = this._targets.gravities;
    let g, absorp, garea;
    const area = this.radius * this.radius * Math.PI;

    for (i = 0, len = gravities.length; i < len; i++) {
      g = gravities[i];

      if (g === this || g.destroyed) continue;

      if (
        (this.currentRadius >= g.radius || this.dragging) &&
        this.distanceTo(g) < (this.currentRadius + g.radius) * 0.85
      ) {
        g.destroyed = true;
        this.gravity += g.gravity;

        absorp = Vector.sub(g, this).scale(g.radius / this.radius * 0.5);
        this.addSpeed(absorp);

        garea = g.radius * g.radius * Math.PI;
        this.currentRadius = Math.sqrt((area + garea * 3) / Math.PI);
        this.radius = Math.sqrt((area + garea) / Math.PI);
      }

      g.addSpeed(Vector.sub(this, g).normalize().scale(this.gravity));
    }

    if (GravityPoint.interferenceToPoint && !this.dragging)
      this.add(this._speed);

    this._speed = new Vector();

    if (this.currentRadius > GravityPoint.RADIUS_LIMIT) this.collapse();

    this._draw(ctx);
  },

  _draw: function(ctx) {
    let grd;

    ctx.save();

    grd = ctx.createRadialGradient(this.x, this.y, this.radius, this.x, this.y, this.radius * 5);
    grd.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
    grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 5, 0, Math.PI * 2, false);
    ctx.fillStyle = grd;
    ctx.fill();

    const r = Math.random() * this.currentRadius * 0.7 + this.currentRadius * 0.3;
    grd = ctx.createRadialGradient(this.x, this.y, r, this.x, this.y, this.currentRadius);
    grd.addColorStop(0, 'rgba(0, 0, 0, 1)');
    grd.addColorStop(1, Math.random() < 0.2 ? 'rgba(255, 196, 0, 0.15)' : 'rgba(103, 181, 191, 0.75)');
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.restore();
  }
});


/**
 * Particle
 */
function Particle(x, y, radius) {
  Vector.call(this, x, y);
  this.radius = radius;

  this._latest = new Vector();
  this._speed  = new Vector();
}

Particle.prototype = (function(o) {
  const s = new Vector(0, 0);
  let p;
  for (p in o) s[p] = o[p];
  return s;
})({
  addSpeed: function(d) {
    this._speed.add(d);
  },

  update: function() {
    if (this._speed.length() > 12) this._speed.normalize().scale(12);

    this._latest.set(this);
    this.add(this._speed);
  }
});

