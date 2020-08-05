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

import { ISupplyPoint, defaultValue } from 'app/shared/model/supply-point.model';

export const ACTION_TYPES = {
  SEARCH_SUPPLYPOINTS: 'supplyPoint/SEARCH_SUPPLYPOINTS',
  FETCH_SUPPLYPOINT_LIST: 'supplyPoint/FETCH_SUPPLYPOINT_LIST',
  FETCH_SUPPLYPOINT: 'supplyPoint/FETCH_SUPPLYPOINT',
  CREATE_SUPPLYPOINT: 'supplyPoint/CREATE_SUPPLYPOINT',
  UPDATE_SUPPLYPOINT: 'supplyPoint/UPDATE_SUPPLYPOINT',
  DELETE_SUPPLYPOINT: 'supplyPoint/DELETE_SUPPLYPOINT',
  RESET: 'supplyPoint/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISupplyPoint>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type SupplyPointState = Readonly<typeof initialState>;

// Reducer

export default (state: SupplyPointState = initialState, action): SupplyPointState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_SUPPLYPOINTS):
    case REQUEST(ACTION_TYPES.FETCH_SUPPLYPOINT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SUPPLYPOINT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SUPPLYPOINT):
    case REQUEST(ACTION_TYPES.UPDATE_SUPPLYPOINT):
    case REQUEST(ACTION_TYPES.DELETE_SUPPLYPOINT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_SUPPLYPOINTS):
    case FAILURE(ACTION_TYPES.FETCH_SUPPLYPOINT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SUPPLYPOINT):
    case FAILURE(ACTION_TYPES.CREATE_SUPPLYPOINT):
    case FAILURE(ACTION_TYPES.UPDATE_SUPPLYPOINT):
    case FAILURE(ACTION_TYPES.DELETE_SUPPLYPOINT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_SUPPLYPOINTS):
    case SUCCESS(ACTION_TYPES.FETCH_SUPPLYPOINT_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_SUPPLYPOINT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SUPPLYPOINT):
    case SUCCESS(ACTION_TYPES.UPDATE_SUPPLYPOINT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SUPPLYPOINT):
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

const apiUrl = 'api/supply-points';
const apiSearchUrl = 'api/_search/supply-points';

// Actions

export const getSearchEntities: ICrudSearchAction<ISupplyPoint> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_SUPPLYPOINTS,
  payload: axios.get<ISupplyPoint>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`)
});

export const getEntities: ICrudGetAllAction<ISupplyPoint> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SUPPLYPOINT_LIST,
    payload: axios.get<ISupplyPoint>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ISupplyPoint> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SUPPLYPOINT,
    payload: axios.get<ISupplyPoint>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISupplyPoint> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SUPPLYPOINT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<ISupplyPoint> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SUPPLYPOINT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISupplyPoint> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SUPPLYPOINT,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
