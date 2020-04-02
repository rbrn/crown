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

import { IReceiverResource, defaultValue } from 'app/shared/model/receiver-resource.model';

export const ACTION_TYPES = {
  SEARCH_RECEIVERRESOURCES: 'receiverResource/SEARCH_RECEIVERRESOURCES',
  FETCH_RECEIVERRESOURCE_LIST: 'receiverResource/FETCH_RECEIVERRESOURCE_LIST',
  FETCH_RECEIVERRESOURCE: 'receiverResource/FETCH_RECEIVERRESOURCE',
  CREATE_RECEIVERRESOURCE: 'receiverResource/CREATE_RECEIVERRESOURCE',
  UPDATE_RECEIVERRESOURCE: 'receiverResource/UPDATE_RECEIVERRESOURCE',
  DELETE_RECEIVERRESOURCE: 'receiverResource/DELETE_RECEIVERRESOURCE',
  RESET: 'receiverResource/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IReceiverResource>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ReceiverResourceState = Readonly<typeof initialState>;

// Reducer

export default (state: ReceiverResourceState = initialState, action): ReceiverResourceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_RECEIVERRESOURCES):
    case REQUEST(ACTION_TYPES.FETCH_RECEIVERRESOURCE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RECEIVERRESOURCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RECEIVERRESOURCE):
    case REQUEST(ACTION_TYPES.UPDATE_RECEIVERRESOURCE):
    case REQUEST(ACTION_TYPES.DELETE_RECEIVERRESOURCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_RECEIVERRESOURCES):
    case FAILURE(ACTION_TYPES.FETCH_RECEIVERRESOURCE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RECEIVERRESOURCE):
    case FAILURE(ACTION_TYPES.CREATE_RECEIVERRESOURCE):
    case FAILURE(ACTION_TYPES.UPDATE_RECEIVERRESOURCE):
    case FAILURE(ACTION_TYPES.DELETE_RECEIVERRESOURCE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_RECEIVERRESOURCES):
    case SUCCESS(ACTION_TYPES.FETCH_RECEIVERRESOURCE_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_RECEIVERRESOURCE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RECEIVERRESOURCE):
    case SUCCESS(ACTION_TYPES.UPDATE_RECEIVERRESOURCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RECEIVERRESOURCE):
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

const apiUrl = 'api/receiver-resources';
const apiSearchUrl = 'api/_search/receiver-resources';

// Actions

export const getSearchEntities: ICrudSearchAction<IReceiverResource> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_RECEIVERRESOURCES,
  payload: axios.get<IReceiverResource>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`)
});

export const getEntities: ICrudGetAllAction<IReceiverResource> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_RECEIVERRESOURCE_LIST,
    payload: axios.get<IReceiverResource>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IReceiverResource> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RECEIVERRESOURCE,
    payload: axios.get<IReceiverResource>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IReceiverResource> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RECEIVERRESOURCE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IReceiverResource> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RECEIVERRESOURCE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IReceiverResource> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RECEIVERRESOURCE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
