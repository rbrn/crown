import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { ISupplyPointResource } from 'app/shared/model/supply-point-resource.model';

type EntityResponseType = HttpResponse<ISupplyPointResource>;
type EntityArrayResponseType = HttpResponse<ISupplyPointResource[]>;

@Injectable({ providedIn: 'root' })
export class SupplyPointResourceService {
  public resourceUrl = SERVER_API_URL + 'api/supply-point-resources';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/supply-point-resources';

  constructor(protected http: HttpClient) {}

  create(supplyPointResource: ISupplyPointResource): Observable<EntityResponseType> {
    return this.http.post<ISupplyPointResource>(this.resourceUrl, supplyPointResource, { observe: 'response' });
  }

  update(supplyPointResource: ISupplyPointResource): Observable<EntityResponseType> {
    return this.http.put<ISupplyPointResource>(this.resourceUrl, supplyPointResource, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ISupplyPointResource>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISupplyPointResource[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISupplyPointResource[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
