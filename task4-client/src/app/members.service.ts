import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from 'models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private httpClient: HttpClient) { }

  getHomeMembersFromServer(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(`http://localhost:3000/member/`);
}
}
