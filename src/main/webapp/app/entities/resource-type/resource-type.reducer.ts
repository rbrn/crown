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

import { IResourceType, defaultValue } from 'app/shared/model/resource-type.model';

export const ACTION_TYPES = {
  SEARCH_RESOURCETYPES: 'resourceType/SEARCH_RESOURCETYPES',
  FETCH_RESOURCETYPE_LIST: 'resourceType/FETCH_RESOURCETYPE_LIST',
  FETCH_RESOURCETYPE: 'resourceType/FETCH_RESOURCETYPE',
  CREATE_RESOURCETYPE: 'resourceType/CREATE_RESOURCETYPE',
  UPDATE_RESOURCETYPE: 'resourceType/UPDATE_RESOURCETYPE',
  DELETE_RESOURCETYPE: 'resourceType/DELETE_RESOURCETYPE',
  RESET: 'resourceType/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IResourceType>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ResourceTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: ResourceTypeState = initialState, action): ResourceTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_RESOURCETYPES):
    case REQUEST(ACTION_TYPES.FETCH_RESOURCETYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RESOURCETYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RESOURCETYPE):
    case REQUEST(ACTION_TYPES.UPDATE_RESOURCETYPE):
    case REQUEST(ACTION_TYPES.DELETE_RESOURCETYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_RESOURCETYPES):
    case FAILURE(ACTION_TYPES.FETCH_RESOURCETYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RESOURCETYPE):
    case FAILURE(ACTION_TYPES.CREATE_RESOURCETYPE):
    case FAILURE(ACTION_TYPES.UPDATE_RESOURCETYPE):
    case FAILURE(ACTION_TYPES.DELETE_RESOURCETYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_RESOURCETYPES):
    case SUCCESS(ACTION_TYPES.FETCH_RESOURCETYPE_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_RESOURCETYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RESOURCETYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_RESOURCETYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RESOURCETYPE):
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

const apiUrl = 'api/resource-types';
const apiSearchUrl = 'api/_search/resource-types';

// Actions

export const getSearchEntities: ICrudSearchAction<IResourceType> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_RESOURCETYPES,
  payload: axios.get<IResourceType>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`)
});

export const getEntities: ICrudGetAllAction<IResourceType> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_RESOURCETYPE_LIST,
    payload: axios.get<IResourceType>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IResourceType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RESOURCETYPE,
    payload: axios.get<IResourceType>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IResourceType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RESOURCETYPE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IResourceType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RESOURCETYPE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IResourceType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RESOURCETYPE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
