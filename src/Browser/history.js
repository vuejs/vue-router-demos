import { AbstractHistory } from 'vue-router/src/history/abstract'

export class MemoryHistory extends AbstractHistory {
  constructor(context, router, base) {
    super(router, base)
    this.context = context
  }

  transitionTo(route, onComplete, onAbort) {
    super.transitionTo(route, () => {
      this.context.onComplete(this)
      onComplete && onComplete()
    }, () => {
      this.context.onAbort(this)
      onAbort && onAbort()
    })
  }
}
