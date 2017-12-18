import {Injectable,Inject} from '@angular/core'
import { Http, Headers } from '@angular/http';
import { Project } from '../domain/index.model'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectService{
    private readonly domain='projects';
    private headers = new Headers({
        'Content-type':'application/json'
    })

    constructor(private http:Http,@Inject('BASE_CONFIG') private config){}

    add(project:Project):Observable<Project>{
        project.id = null;
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .post(uri,JSON.stringify(project),{headers:this.headers})
            .map(res => res.json())
    }

    update(project:Project):Observable<Project>{
        const uri = `${this.config.uri}/${this.domain}/${project.id}`;
        const toUpdate = {
            name:project.name,
            desc:project.desc,
            coverImg:project.coverImg
        };
        return this.http
            .patch(uri,JSON.stringify(toUpdate),{headers:this.headers})
            .map(res => res.json())
    }

    del(project:Project):Observable<Project>{
        const delTasks$ = Observable.from(project.taskLists ? project.taskLists : [])
            .mergeMap(listId => this.http.delete(`${this.config.uri}/taskLists/${listId}`))
            .count();
        return delTasks$.switchMap(_=>this.http.delete(`${this.config.uri}/${this.domain}/${project.id}`))
            .mapTo(project);
    }

    get(userId:string):Observable<Project[]>{
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .get(uri,{params:{'member_like':userId}})
            .map(res => res.json() as Project[])
    }
}