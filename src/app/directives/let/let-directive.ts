import { Directive, EmbeddedViewRef, Inject, Input, OnDestroy, TemplateRef, ViewContainerRef } from "@angular/core";
import { Nullable } from "src/app/interfaces/nullable";

interface NgLetContext<T> {
  $implicit: Nullable<T>;
  ngLet: Nullable<T>;
}

@Directive({
  selector: '[ngLet]'
})
export class LetDirective<T> implements OnDestroy {
  @Input() set ngLet(value: T) {
    this.setValue(value);
  }

  @Input() set ngLetOf(value: T) {
    this.setValue(value);
  }

  private context: NgLetContext<T> = { $implicit: null, ngLet: null };

  private viewRef: EmbeddedViewRef<NgLetContext<T>> = this.viewContainer.createEmbeddedView(this.templateRef, this.context);

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<NgLetContext<T>>
  ) {
  }

  ngOnDestroy(): void {
    this.viewContainer.clear();
    if (this.viewRef) {
      this.viewRef.destroy();
      this.viewRef = null;
    }  
  }

  private setValue(value: T) {
    this.context.$implicit = value;
    this.context.ngLet = value;
    if (this.viewRef) {
      this.viewRef.markForCheck();
    }
  }
}