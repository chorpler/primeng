import { Directive            } from "@angular/core"     ;
import { OnDestroy            } from "@angular/core"     ;
import { Input                } from "@angular/core"     ;
import { Output               } from "@angular/core"     ;
import { EventEmitter         } from "@angular/core"     ;
import { Subject              } from "rxjs"              ;
import { takeUntil            } from "rxjs/operators"    ;
import { debounceTime         } from "rxjs/operators"    ;
import { distinctUntilChanged } from "rxjs/operators"    ;
import { tap                  } from "rxjs/operators"    ;
import { DomHandler           } from '../dom/domhandler' ;


@Directive({
  selector: '[pButton]',
  providers: [DomHandler]
})
export abstract class AbstractDebounceDirective implements OnDestroy {
  @Input()
  public debounceTime: number;

  @Output()
  public onEvent: EventEmitter<any>;

  protected emitEvent$: Subject<any>;
  protected subscription$: Subject<void>;

  constructor() {
    this.debounceTime = 500;
    this.onEvent = new EventEmitter<any>();
    this.emitEvent$ = new Subject<any>();
    this.subscription$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.emitEvent$
      .pipe(
        takeUntil(this.subscription$),
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
        tap(value => this.emitChange(value))
      )
      .subscribe();
  }

  public emitChange(value: any): void {
    this.onEvent.emit(value);
  }

  ngOnDestroy(): void {
    this.subscription$.next();
    this.subscription$.complete();
  }
}
