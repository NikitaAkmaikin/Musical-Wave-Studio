import {  makeAutoObservable, computed, runInAction } from "mobx"
import { Posts } from "../../utils/api/getPosts";
import { getPosts } from "../../utils/api/getPosts";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";

class PostsStore {
  posts?: IPromiseBasedObservable<Posts[]>

  constructor() {
    makeAutoObservable(this)
  }

  // getPostsAction = async () => {
  //   try {
  //     this.isLoading = true;
  //     const res = await getPosts();

  //     runInAction(() => {
  //       this.posts = res;
  //       this.isLoading = false;
  //     });
  //   } catch {
  //     this.isLoading = false;
  //   }
    
  // }

  getPostsAction = () => {
    this.posts = fromPromise(getPosts())
  }
}

export default new PostsStore();