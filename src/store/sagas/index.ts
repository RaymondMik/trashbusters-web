import { all } from "redux-saga/effects";
import locationsSaga from "./locations";

// Sagas that will be called when the store is initialised
export default function* rootSaga() {
   yield all([
      locationsSaga()
   ]);
}