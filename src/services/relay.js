import {relaysRef} from '../firebase';

export const manualToggleRelay = (relay, switched) => relaysRef.child(relay).set({switched, manual: true});
