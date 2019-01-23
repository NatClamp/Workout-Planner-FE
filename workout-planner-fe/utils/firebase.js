import * as firebase from 'firebase';
import config from '../config';

firebase.initializeApp(config.firebase);
firebase.auth().currentUser.getIdToken(true);

export default firebase;
