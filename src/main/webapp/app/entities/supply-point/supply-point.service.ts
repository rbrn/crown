import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { ISupplyPoint } from 'app/shared/model/supply-point.model';

type EntityResponseType = HttpResponse<ISupplyPoint>;
type EntityArrayResponseType = HttpResponse<ISupplyPoint[]>;

@Injectable({ providedIn: 'root' })
export class SupplyPointService {
  public resourceUrl = SERVER_API_URL + 'api/supply-points';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/supply-points';

  constructor(protected http: HttpClient) {}

  create(supplyPoint: ISupplyPoint): Observable<EntityResponseType> {
    return this.http.post<ISupplyPoint>(this.resourceUrl, supplyPoint, { observe: 'response' });
  }

  update(supplyPoint: ISupplyPoint): Observable<EntityResponseType> {
    return this.http.put<ISupplyPoint>(this.resourceUrl, supplyPoint, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ISupplyPoint>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISupplyPoint[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISupplyPoint[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
