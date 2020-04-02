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

import { IRecieverResource, defaultValue } from 'app/shared/model/reciever-resource.model';

export const ACTION_TYPES = {
  SEARCH_RECIEVERRESOURCES: 'recieverResource/SEARCH_RECIEVERRESOURCES',
  FETCH_RECIEVERRESOURCE_LIST: 'recieverResource/FETCH_RECIEVERRESOURCE_LIST',
  FETCH_RECIEVERRESOURCE: 'recieverResource/FETCH_RECIEVERRESOURCE',
  CREATE_RECIEVERRESOURCE: 'recieverResource/CREATE_RECIEVERRESOURCE',
  UPDATE_RECIEVERRESOURCE: 'recieverResource/UPDATE_RECIEVERRESOURCE',
  DELETE_RECIEVERRESOURCE: 'recieverResource/DELETE_RECIEVERRESOURCE',
  RESET: 'recieverResource/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRecieverResource>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type RecieverResourceState = Readonly<typeof initialState>;

// Reducer

export default (state: RecieverResourceState = initialState, action): RecieverResourceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_RECIEVERRESOURCES):
    case REQUEST(ACTION_TYPES.FETCH_RECIEVERRESOURCE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RECIEVERRESOURCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RECIEVERRESOURCE):
    case REQUEST(ACTION_TYPES.UPDATE_RECIEVERRESOURCE):
    case REQUEST(ACTION_TYPES.DELETE_RECIEVERRESOURCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_RECIEVERRESOURCES):
    case FAILURE(ACTION_TYPES.FETCH_RECIEVERRESOURCE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RECIEVERRESOURCE):
    case FAILURE(ACTION_TYPES.CREATE_RECIEVERRESOURCE):
    case FAILURE(ACTION_TYPES.UPDATE_RECIEVERRESOURCE):
    case FAILURE(ACTION_TYPES.DELETE_RECIEVERRESOURCE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_RECIEVERRESOURCES):
    case SUCCESS(ACTION_TYPES.FETCH_RECIEVERRESOURCE_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_RECIEVERRESOURCE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RECIEVERRESOURCE):
    case SUCCESS(ACTION_TYPES.UPDATE_RECIEVERRESOURCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RECIEVERRESOURCE):
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

const apiUrl = 'api/reciever-resources';
const apiSearchUrl = 'api/_search/reciever-resources';

// Actions

export const getSearchEntities: ICrudSearchAction<IRecieverResource> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_RECIEVERRESOURCES,
  payload: axios.get<IRecieverResource>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`)
});

export const getEntities: ICrudGetAllAction<IRecieverResource> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_RECIEVERRESOURCE_LIST,
    payload: axios.get<IRecieverResource>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IRecieverResource> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RECIEVERRESOURCE,
    payload: axios.get<IRecieverResource>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRecieverResource> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RECIEVERRESOURCE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IRecieverResource> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RECIEVERRESOURCE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRecieverResource> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RECIEVERRESOURCE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
