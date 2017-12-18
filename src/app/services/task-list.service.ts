import {Injectable,Inject} from '@angular/core'
import { Http, Headers } from '@angular/http';
import { TaskList } from '../domain/index.model'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskListService{
    private readonly domain='taskLists';
    private headers = new Headers({
        'Content-type':'application/json'
    })

    constructor(private http:Http,@Inject('BASE_CONFIG') private config){}

    add(taskList:TaskList):Observable<TaskList>{
        taskList.id = null;
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .post(uri,JSON.stringify(taskList),{headers:this.headers})
            .map(res => res.json())
    }

    update(taskList:TaskList):Observable<TaskList>{
        const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
        const toUpdate = {
            name:taskList.name,
            desc:taskList.desc,
            coverImg:taskList.coverImg
        };
        return this.http
            .patch(uri,JSON.stringify(toUpdate),{headers:this.headers})
            .map(res => res.json())
    }

    del(taskList:TaskList):Observable<TaskList>{
        const delTasks$ = Observable.from(taskList.taskLists)
            .mergeMap(listId => this.http.delete(`${this.config.uri}/taskLists/${listId}`))
            .count();
        return delTasks$.switchMap(_=>this.http.delete(`${this.config.uri}/${this.domain}/${taskList.id}`))
            .mapTo(taskList);
    }

    get(projectId:string):Observable<TaskList[]>{
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .get(uri,{params:{'projectId':projectId}})
            .map(res => res.json() as TaskList[])
    }

    swapOrder(src:TaskList,target:TaskList):Observable<TaskList[]>{
        const dragUri = `${this.config.uri}/${this.domain}/${src.id}`
        const drogUri = `${this.config.uri}/${this.domain}/${target.id}`
        const drag$ = this.http.patch(dragUri,JSON.stringify({order:target.order}),{headers:this.headers})
            .map(res=>res.json());
        const drop$ = this.http.patch(dragUri,JSON.stringify({order:target.order}),{headers:this.headers})
            .map(res=>res.json());
        
        return Observable
            .concat(drag$,drop$)
            .reduce((arrs,list)=>[...arrs,list],[])
    }
}