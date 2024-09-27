import {  makeAutoObservable, makeObservable, observable, action, computed } from "mobx"

class CounterMobX {
  counter = 0

  constructor() {
    // makeObservable(this, {
    //   counter: observable,
    //   increment: action,
    //   decrement: action,
    //   total: computed,
    // })
    makeAutoObservable(this)
  }

  increment = (value: number) => {
    this.counter += value;
  }

  decrement = (value: number) => {
    this.counter -= value;
  }

  get total() {
    return this.counter * 2;
  }
}

export default CounterMobX