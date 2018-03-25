import { firestore } from 'firebase';
import 'firebase/firestore';
import app from './app';

const db = firestore(app);

export default db;
