import { Component } from 'react';
import { firestore } from 'firebase';

const { QuerySnapshot, DocumentSnapshot } = firestore;

function makeDataFromDoc(doc) {
  const data = doc.data();
  Object.defineProperty(data, '__id', {
    value: doc.id,
    writable: false,
    enumerable: false,
    configurable: false,
  });
  return data;
}

function makeDataFromSnapshot(snapshot) {
  if (!snapshot) {
    return null;
  }
  if (snapshot instanceof DocumentSnapshot) {
    return makeDataFromDoc(snapshot);
  }
  if (snapshot instanceof QuerySnapshot && Array.isArray(snapshot.docs)) {
    return snapshot.docs.map(makeDataFromDoc);
  }
  throw new Error("Cannot identify snapshot's type");
}

/**
 * A container for the data coming from Firestore.
 * It is linked to a part of the database by passing a dbRef as a prop.
 * Everytime the data updates, it is passed to a render prop as first argument.
 * If it is linked to a document, data will be the document's data
 * with a property __id equal to the document's id.
 * If it is linked to a query or a collection, data will be an array of objects
 * where each of them is the data of the corresponding document (with __id).
 * The render prop is also passed the raw snapshot as second parameter
 * and the dbRef as the third.
 */
class FireContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { snapshot: null };
  }
  componentWillReceiveProps(nextProps) {
    // Undocumented isEqual
    if (!this.props.dbRef.isEqual(nextProps.dbRef)) {
      this.sync(nextProps.dbRef);
    }
  }
  componentDidMount() {
    this.sync(this.props.dbRef);
  }
  componentWillUnmount() {
    this.unsync();
  }
  saveSnapshot = snapshot => {
    this.setState({ snapshot });
  };
  sync(dbRef) {
    this.unsync();
    this.unsync = dbRef.onSnapshot(this.saveSnapshot);
  }
  unsync() {
    // Will be set when sync is called
  }
  render() {
    // children is the render prop
    return this.props.children(
      makeDataFromSnapshot(this.state.snapshot),
      this.state.snapshot,
      this.props.dbRef,
    );
  }
}

export default FireContainer;
