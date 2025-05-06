import { combineReducers, createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; 
import storage from 'redux-persist/lib/storage/index.js';
import { persistStore, persistReducer } from 'redux-persist';

import {
    courseCreateReducer,
    courseListReducer,
    courseDetailsReducer,
    courseDeleteReducer,
  } from "./Reducers/course";

  import {
    chapterCreateReducer,
    chapterListReducer,
    chapterDetailsReducer,
    chapterDeleteReducer,
  } from "./Reducers/chapter";

  import {
  contentDeleteReducer,
  contentFetchAllReducer,
  contentFetchByIdReducer,
  contentUploadReducer 
} from "./Reducers/content";

import { createStudyRequestReducer } from './Reducers/studyRequest';

import {createStudyPlanReducer,
    studentStudyPlanReducer }
 from './Reducers/studyPlan';

import { enrollmentReducer } from './Reducers/enrollment'

const persistConfig = {
    key: 'root',
    storage,
    version: 1
};

const rootReducer = combineReducers({
    courseCreateReducer,
    courseListReducer,
    courseDetailsReducer,
    courseDeleteReducer,

    chapterCreateReducer,
    chapterListReducer,
    chapterDetailsReducer,
    chapterDeleteReducer,

    contentDeleteReducer,
    contentFetchAllReducer,
    contentFetchByIdReducer,
    contentUploadReducer ,

    enrollmentReducer,

    createStudyRequestReducer,

    createStudyPlanReducer,
    studentStudyPlanReducer, 

    

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    applyMiddleware(thunk) 
);

export const persistor = persistStore(store);