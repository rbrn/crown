import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRequestPoint, defaultValue } from 'app/shared/model/request-point.model';

export const ACTION_TYPES = {
  SEARCH_REQUESTPOINTS: 'requestPoint/SEARCH_REQUESTPOINTS',
  FETCH_REQUESTPOINT_LIST: 'requestPoint/FETCH_REQUESTPOINT_LIST',
  FETCH_REQUESTPOINT: 'requestPoint/FETCH_REQUESTPOINT',
  CREATE_REQUESTPOINT: 'requestPoint/CREATE_REQUESTPOINT',
  UPDATE_REQUESTPOINT: 'requestPoint/UPDATE_REQUESTPOINT',
  DELETE_REQUESTPOINT: 'requestPoint/DELETE_REQUESTPOINT',
  RESET: 'requestPoint/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRequestPoint>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type RequestPointState = Readonly<typeof initialState>;

// Reducer

export default (state: RequestPointState = initialState, action): RequestPointState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_REQUESTPOINTS):
    case REQUEST(ACTION_TYPES.FETCH_REQUESTPOINT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_REQUESTPOINT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_REQUESTPOINT):
    case REQUEST(ACTION_TYPES.UPDATE_REQUESTPOINT):
    case REQUEST(ACTION_TYPES.DELETE_REQUESTPOINT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_REQUESTPOINTS):
    case FAILURE(ACTION_TYPES.FETCH_REQUESTPOINT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_REQUESTPOINT):
    case FAILURE(ACTION_TYPES.CREATE_REQUESTPOINT):
    case FAILURE(ACTION_TYPES.UPDATE_REQUESTPOINT):
    case FAILURE(ACTION_TYPES.DELETE_REQUESTPOINT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_REQUESTPOINTS):
    case SUCCESS(ACTION_TYPES.FETCH_REQUESTPOINT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_REQUESTPOINT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_REQUESTPOINT):
    case SUCCESS(ACTION_TYPES.UPDATE_REQUESTPOINT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_REQUESTPOINT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/request-points';
const apiSearchUrl = 'api/_search/request-points';

// Actions

export const getSearchEntities: ICrudSearchAction<IRequestPoint> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_REQUESTPOINTS,
  payload: axios.get<IRequestPoint>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IRequestPoint> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_REQUESTPOINT_LIST,
  payload: axios.get<IRequestPoint>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IRequestPoint> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_REQUESTPOINT,
    payload: axios.get<IRequestPoint>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRequestPoint> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_REQUESTPOINT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRequestPoint> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_REQUESTPOINT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRequestPoint> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_REQUESTPOINT,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
