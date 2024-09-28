import MusicStore from './store/MusicStore';
import SubscriptionStore from './store/SubscriptionStore';

class RootStore {
  musicStore = MusicStore;
  subscriptionStore = SubscriptionStore;
}

export default RootStore;
