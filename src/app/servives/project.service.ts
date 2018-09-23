import { Injectable, Inject } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Project } from '../domain';
import { from, Observable } from 'rxjs';
import { count, mergeMap, switchMap, map } from 'rxjs/operators';

@Injectable()
export class ProjectService {
    private readonly domain = 'projects'
    private headers = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) { }

    add(project: Project): Observable<Project> {
        project.id = null;
        const uri = `${this.config.uri}/${this.domain}`
        return this.http.post<Project>(uri, JSON.stringify(project), {
            headers: this.headers
        });
    }

    update(project: Project): Observable<Project> {
        debugger
        const uri = `${this.config.uri}/${this.domain}/${project.id}`;
        const toUpdate = {
            name: project.name,
            coverImg: project.coverImg,
            desc: project.desc
        };
        return this.http.patch<Project>(uri, JSON.stringify(toUpdate), {
            headers: this.headers
        });
    }

    del(project: Project): Observable<Project> {
        const deltask$ = from(project.taskLists ? project.taskLists : []).pipe(
            mergeMap(listId =>
                this.http.delete(`${this.config.uri}/taskLists/${listId}`)
            ),
            count() //保证序列里的流都结束了
        );
        const uri = `${this.config.uri}/${this.domain}/${project.id}`;
        return deltask$.pipe(
            switchMap(p => this.http.delete(uri).pipe(map(prj => project)))
        );
    }
    get(userId: string): Observable<Project[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        const params = new HttpParams().set('members_like', userId);
        return this.http.get<Project[]>(uri, {
            params: params,
            headers: this.headers
        });
    }
}