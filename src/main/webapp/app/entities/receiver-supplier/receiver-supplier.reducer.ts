import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IReceiverSupplier, defaultValue } from 'app/shared/model/receiver-supplier.model';

export const ACTION_TYPES = {
  FETCH_RECEIVERSUPPLIER_LIST: 'receiverSupplier/FETCH_RECEIVERSUPPLIER_LIST',
  FETCH_RECEIVERSUPPLIER: 'receiverSupplier/FETCH_RECEIVERSUPPLIER',
  CREATE_RECEIVERSUPPLIER: 'receiverSupplier/CREATE_RECEIVERSUPPLIER',
  UPDATE_RECEIVERSUPPLIER: 'receiverSupplier/UPDATE_RECEIVERSUPPLIER',
  DELETE_RECEIVERSUPPLIER: 'receiverSupplier/DELETE_RECEIVERSUPPLIER',
  RESET: 'receiverSupplier/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IReceiverSupplier>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ReceiverSupplierState = Readonly<typeof initialState>;

// Reducer

export default (state: ReceiverSupplierState = initialState, action): ReceiverSupplierState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RECEIVERSUPPLIER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RECEIVERSUPPLIER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RECEIVERSUPPLIER):
    case REQUEST(ACTION_TYPES.UPDATE_RECEIVERSUPPLIER):
    case REQUEST(ACTION_TYPES.DELETE_RECEIVERSUPPLIER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_RECEIVERSUPPLIER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RECEIVERSUPPLIER):
    case FAILURE(ACTION_TYPES.CREATE_RECEIVERSUPPLIER):
    case FAILURE(ACTION_TYPES.UPDATE_RECEIVERSUPPLIER):
    case FAILURE(ACTION_TYPES.DELETE_RECEIVERSUPPLIER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_RECEIVERSUPPLIER_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_RECEIVERSUPPLIER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RECEIVERSUPPLIER):
    case SUCCESS(ACTION_TYPES.UPDATE_RECEIVERSUPPLIER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RECEIVERSUPPLIER):
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

const apiUrl = 'api/receiver-suppliers';

// Actions

export const getEntities: ICrudGetAllAction<IReceiverSupplier> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_RECEIVERSUPPLIER_LIST,
    payload: axios.get<IReceiverSupplier>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IReceiverSupplier> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RECEIVERSUPPLIER,
    payload: axios.get<IReceiverSupplier>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IReceiverSupplier> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RECEIVERSUPPLIER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IReceiverSupplier> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RECEIVERSUPPLIER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IReceiverSupplier> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RECEIVERSUPPLIER,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
