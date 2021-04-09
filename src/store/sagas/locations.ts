import { all, call, put, takeLatest } from "redux-saga/effects";
import { Location } from "../../../types";
import * as actions from "../actions/locations";
import { FIREBASE_URI } from "../../../secrets";
import { fetchData } from "../../../services";

function* fetchLocationsSaga() {
   yield takeLatest(actions.GET_LOCATIONS, function* () {
      try {
         // @ts-ignore
         const response: any = yield call(fetchData, { endpoint: `${FIREBASE_URI}/locations.json` });
         // @ts-ignore
         const resData: any = yield response.json();
     
         let locations: Location[] = [];

         for (let key in resData) {
            if (resData.hasOwnProperty(key)) {
               locations.push({ _id: key, ...resData[key] });
            }
         }
 
         if (!response.ok) {
            throw `A ${response.status} error occured`
         }

         yield put(actions.getLocationsSuccess(locations));
      } catch(error) {
         yield put(actions.getLocationsFailure(error));
      }
   });
}

export default function* locationsSaga() {
   yield all([
      fetchLocationsSaga(),
   ]);
}
