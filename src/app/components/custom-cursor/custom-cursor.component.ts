import { Component, ElementRef, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #dot class="cursor-dot"></div>
    <div #ring class="cursor-ring"></div>
  `,
  styles: [`
    :host {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 9999;
    }
  `]
})
export class CustomCursorComponent implements OnInit, OnDestroy {
  @ViewChild('dot', { static: true }) dotRef!: ElementRef<HTMLDivElement>;
  @ViewChild('ring', { static: true }) ringRef!: ElementRef<HTMLDivElement>;

  // Target mouse coordinates
  private mouseX = 0;
  private mouseY = 0;

  // Smoothly interpolated outer ring coordinates
  private ringX = 0;
  private ringY = 0;

  // Visual states
  private isVisible = false;
  private isHovered = false;
  private isClicked = false;
  private isInitialized = false;

  private animationFrameId: number | null = null;
  private readonly isBrowser: boolean;

  constructor(
    private readonly ngZone: NgZone,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    // Do not initialize custom cursor on devices that don't support hovering/mouse (like phones/touchscreens)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      // Event listeners
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseleave', this.onMouseLeave);
      window.addEventListener('mouseenter', this.onMouseEnter);
      window.addEventListener('mousedown', this.onMouseDown);
      window.addEventListener('mouseup', this.onMouseUp);

      // Event delegation to capture hovering on interactive/clickable elements
      document.addEventListener('mouseover', this.onMouseOver);
      document.addEventListener('mouseout', this.onMouseOut);

      // Add helper class to body to hide default browser cursor
      document.body.classList.add('custom-cursor-active');

      // Start performance-optimized tick loop
      this.tick();
    });
  }

  private onMouseMove = (e: MouseEvent) => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    if (!this.isInitialized) {
      // Position cursor elements instantly to start so they don't slide in from (0,0)
      this.ringX = this.mouseX;
      this.ringY = this.mouseY;
      this.isInitialized = true;
    }

    if (!this.isVisible) {
      this.isVisible = true;
      this.updateVisibility();
    }
  };

  private onMouseLeave = () => {
    this.isVisible = false;
    this.updateVisibility();
  };

  private onMouseEnter = () => {
    this.isVisible = true;
    this.updateVisibility();
  };

  private onMouseDown = () => {
    this.isClicked = true;
    this.updateClickState();
  };

  private onMouseUp = () => {
    this.isClicked = false;
    this.updateClickState();
  };

  private onMouseOver = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target) return;

    // Detect if hovering an interactive component
    const interactive = target.closest('a, button, input, textarea, select, [role="button"], .interactive-element');
    if (interactive) {
      this.isHovered = true;
      this.updateHoverState();
    }
  };

  private onMouseOut = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target) return;

    const relatedTarget = e.relatedTarget as HTMLElement;
    
    // If moving to a target that is NOT inside an interactive element, remove hover state
    const interactive = relatedTarget?.closest('a, button, input, textarea, select, [role="button"], .interactive-element');
    if (!interactive) {
      this.isHovered = false;
      this.updateHoverState();
    }
  };

  private tick = () => {
    // Linear interpolation rate (higher = faster, lower = smoother lag effect)
    const lerp = 0.16;

    this.ringX += (this.mouseX - this.ringX) * lerp;
    this.ringY += (this.mouseY - this.ringY) * lerp;

    // Update coordinates directly on DOM for high performance
    if (this.dotRef?.nativeElement) {
      this.dotRef.nativeElement.style.transform = `translate3d(${this.mouseX}px, ${this.mouseY}px, 0)`;
    }

    if (this.ringRef?.nativeElement) {
      this.ringRef.nativeElement.style.transform = `translate3d(${this.ringX}px, ${this.ringY}px, 0)`;
    }

    this.animationFrameId = requestAnimationFrame(this.tick);
  };

  private updateVisibility(): void {
    if (this.dotRef?.nativeElement) {
      if (this.isVisible) {
        this.dotRef.nativeElement.classList.add('visible');
      } else {
        this.dotRef.nativeElement.classList.remove('visible');
      }
    }
    if (this.ringRef?.nativeElement) {
      if (this.isVisible) {
        this.ringRef.nativeElement.classList.add('visible');
      } else {
        this.ringRef.nativeElement.classList.remove('visible');
      }
    }
  }

  private updateHoverState(): void {
    if (this.dotRef?.nativeElement) {
      if (this.isHovered) {
        this.dotRef.nativeElement.classList.add('hovered');
      } else {
        this.dotRef.nativeElement.classList.remove('hovered');
      }
    }
    if (this.ringRef?.nativeElement) {
      if (this.isHovered) {
        this.ringRef.nativeElement.classList.add('hovered');
      } else {
        this.ringRef.nativeElement.classList.remove('hovered');
      }
    }
  }

  private updateClickState(): void {
    if (this.ringRef?.nativeElement) {
      if (this.isClicked) {
        this.ringRef.nativeElement.classList.add('clicked');
      } else {
        this.ringRef.nativeElement.classList.remove('clicked');
      }
    }
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) return;

    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseleave', this.onMouseLeave);
    window.removeEventListener('mouseenter', this.onMouseEnter);
    window.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mouseover', this.onMouseOver);
    document.removeEventListener('mouseout', this.onMouseOut);

    document.body.classList.remove('custom-cursor-active');

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
