import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import authReducer from '../src/redux/AuthSlice'
import defectsReducer from './redux/DefectsSlice'
import allDefectReducer from './redux/AllDefectSlice'

// Define your initial state
const initialState = {
  sidebarShow: true,
  theme: 'light',
}

// Define your UI reducer
const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      console.log(state)
      return { ...state, ...rest }
    default:
      return state
  }
}

// Combine your reducers
const rootReducer = combineReducers({
  ui: changeState,
  auth: authReducer,
  defects: defectsReducer,
  allDefects : allDefectReducer
})

// Configure persist
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Create store with persisted reducer
const store = createStore(persistedReducer, applyMiddleware())

// Export the persistor
export const persistor = persistStore(store)
export default store
