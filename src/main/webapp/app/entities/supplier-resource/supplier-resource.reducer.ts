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

import { ISupplierResource, defaultValue } from 'app/shared/model/supplier-resource.model';

export const ACTION_TYPES = {
  SEARCH_SUPPLIERRESOURCES: 'supplierResource/SEARCH_SUPPLIERRESOURCES',
  FETCH_SUPPLIERRESOURCE_LIST: 'supplierResource/FETCH_SUPPLIERRESOURCE_LIST',
  FETCH_SUPPLIERRESOURCE: 'supplierResource/FETCH_SUPPLIERRESOURCE',
  CREATE_SUPPLIERRESOURCE: 'supplierResource/CREATE_SUPPLIERRESOURCE',
  UPDATE_SUPPLIERRESOURCE: 'supplierResource/UPDATE_SUPPLIERRESOURCE',
  DELETE_SUPPLIERRESOURCE: 'supplierResource/DELETE_SUPPLIERRESOURCE',
  RESET: 'supplierResource/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISupplierResource>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type SupplierResourceState = Readonly<typeof initialState>;

// Reducer

export default (state: SupplierResourceState = initialState, action): SupplierResourceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_SUPPLIERRESOURCES):
    case REQUEST(ACTION_TYPES.FETCH_SUPPLIERRESOURCE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SUPPLIERRESOURCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SUPPLIERRESOURCE):
    case REQUEST(ACTION_TYPES.UPDATE_SUPPLIERRESOURCE):
    case REQUEST(ACTION_TYPES.DELETE_SUPPLIERRESOURCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_SUPPLIERRESOURCES):
    case FAILURE(ACTION_TYPES.FETCH_SUPPLIERRESOURCE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SUPPLIERRESOURCE):
    case FAILURE(ACTION_TYPES.CREATE_SUPPLIERRESOURCE):
    case FAILURE(ACTION_TYPES.UPDATE_SUPPLIERRESOURCE):
    case FAILURE(ACTION_TYPES.DELETE_SUPPLIERRESOURCE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_SUPPLIERRESOURCES):
    case SUCCESS(ACTION_TYPES.FETCH_SUPPLIERRESOURCE_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_SUPPLIERRESOURCE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SUPPLIERRESOURCE):
    case SUCCESS(ACTION_TYPES.UPDATE_SUPPLIERRESOURCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SUPPLIERRESOURCE):
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

const apiUrl = 'api/supplier-resources';
const apiSearchUrl = 'api/_search/supplier-resources';

// Actions

export const getSearchEntities: ICrudSearchAction<ISupplierResource> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_SUPPLIERRESOURCES,
  payload: axios.get<ISupplierResource>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`)
});

export const getEntities: ICrudGetAllAction<ISupplierResource> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SUPPLIERRESOURCE_LIST,
    payload: axios.get<ISupplierResource>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ISupplierResource> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SUPPLIERRESOURCE,
    payload: axios.get<ISupplierResource>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISupplierResource> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SUPPLIERRESOURCE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<ISupplierResource> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SUPPLIERRESOURCE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISupplierResource> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SUPPLIERRESOURCE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
