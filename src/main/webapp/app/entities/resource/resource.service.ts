import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IResource } from 'app/shared/model/resource.model';

type EntityResponseType = HttpResponse<IResource>;
type EntityArrayResponseType = HttpResponse<IResource[]>;

@Injectable({ providedIn: 'root' })
export class ResourceService {
  public resourceUrl = SERVER_API_URL + 'api/resources';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/resources';

  constructor(protected http: HttpClient) {}

  create(resource: IResource): Observable<EntityResponseType> {
    return this.http.post<IResource>(this.resourceUrl, resource, { observe: 'response' });
  }

  update(resource: IResource): Observable<EntityResponseType> {
    return this.http.put<IResource>(this.resourceUrl, resource, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IResource>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IResource[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IResource[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
