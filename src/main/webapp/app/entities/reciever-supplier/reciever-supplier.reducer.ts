import axios from 'axios';
import {
  ICrudSearchAction,
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRecieverSupplier, defaultValue } from 'app/shared/model/reciever-supplier.model';

export const ACTION_TYPES = {
  SEARCH_RECIEVERSUPPLIERS: 'recieverSupplier/SEARCH_RECIEVERSUPPLIERS',
  FETCH_RECIEVERSUPPLIER_LIST: 'recieverSupplier/FETCH_RECIEVERSUPPLIER_LIST',
  FETCH_RECIEVERSUPPLIER: 'recieverSupplier/FETCH_RECIEVERSUPPLIER',
  CREATE_RECIEVERSUPPLIER: 'recieverSupplier/CREATE_RECIEVERSUPPLIER',
  UPDATE_RECIEVERSUPPLIER: 'recieverSupplier/UPDATE_RECIEVERSUPPLIER',
  DELETE_RECIEVERSUPPLIER: 'recieverSupplier/DELETE_RECIEVERSUPPLIER',
  RESET: 'recieverSupplier/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRecieverSupplier>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type RecieverSupplierState = Readonly<typeof initialState>;

// Reducer

export default (state: RecieverSupplierState = initialState, action): RecieverSupplierState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_RECIEVERSUPPLIERS):
    case REQUEST(ACTION_TYPES.FETCH_RECIEVERSUPPLIER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RECIEVERSUPPLIER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RECIEVERSUPPLIER):
    case REQUEST(ACTION_TYPES.UPDATE_RECIEVERSUPPLIER):
    case REQUEST(ACTION_TYPES.DELETE_RECIEVERSUPPLIER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_RECIEVERSUPPLIERS):
    case FAILURE(ACTION_TYPES.FETCH_RECIEVERSUPPLIER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RECIEVERSUPPLIER):
    case FAILURE(ACTION_TYPES.CREATE_RECIEVERSUPPLIER):
    case FAILURE(ACTION_TYPES.UPDATE_RECIEVERSUPPLIER):
    case FAILURE(ACTION_TYPES.DELETE_RECIEVERSUPPLIER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_RECIEVERSUPPLIERS):
    case SUCCESS(ACTION_TYPES.FETCH_RECIEVERSUPPLIER_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_RECIEVERSUPPLIER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RECIEVERSUPPLIER):
    case SUCCESS(ACTION_TYPES.UPDATE_RECIEVERSUPPLIER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RECIEVERSUPPLIER):
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

const apiUrl = 'api/reciever-suppliers';
const apiSearchUrl = 'api/_search/reciever-suppliers';

// Actions

export const getSearchEntities: ICrudSearchAction<IRecieverSupplier> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_RECIEVERSUPPLIERS,
  payload: axios.get<IRecieverSupplier>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`)
});

export const getEntities: ICrudGetAllAction<IRecieverSupplier> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_RECIEVERSUPPLIER_LIST,
    payload: axios.get<IRecieverSupplier>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IRecieverSupplier> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RECIEVERSUPPLIER,
    payload: axios.get<IRecieverSupplier>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRecieverSupplier> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RECIEVERSUPPLIER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IRecieverSupplier> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RECIEVERSUPPLIER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRecieverSupplier> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RECIEVERSUPPLIER,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
