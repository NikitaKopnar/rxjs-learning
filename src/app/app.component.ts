import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription, filter, fromEvent, map, switchMap, tap } from 'rxjs';
import { ajax } from 'rxjs/ajax';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('search',{static:true}) search?:ElementRef<HTMLInputElement>
  typeAheadSub?:Subscription
  ngOnInit(){
    const searchObs = fromEvent(this.search!.nativeElement,"input").pipe(switchMap((inptEvent:any)=>//inptEvent.target.value
    { return ajax(`https://api.github.com/search/users?q=${inptEvent.target.value}`)}
    ))
    this.typeAheadSub = searchObs.subscribe((value:any)=>{
      //console.log(value);
    })
    // //Observable -> who emits the data
    // const pizzaObservale = new Observable((subscriber)=>{
    //   subscriber.next({name:'Darm House',vag:true});
    //   subscriber.next({name:'Margeria',vag:true});
    //   subscriber.complete();
    //  })
    //  //subscriber/observer -> who consumes the emitted data
    //  pizzaObservale.subscribe({
    //   next:(value)=>console.log(value),
    //   error:(err)=>console.log(err.message),
    //   complete:()=>console.log("Done!")
    //  })

     //Observable -> who emits the data
    //   const pizzaObservale = new Observable((subscriber)=>{
    //   subscriber.next({name:'Darm House',vag:true});
    //   subscriber.next({name:'Margeria',vag:true});
    //   subscriber.complete();

    //  }).pipe(//to modify data
    //   map((pizza:any)=>pizza.name)//map iterate over all emited values
    //  )
    //  //subscriber/observer -> who consumes the emitted data
    //  pizzaObservale.subscribe({
    //   next:(value)=>console.log(value),
    //   error:(err)=>console.log(err.message),
    //   complete:()=>console.log("Done!")
    //  })

     //Observable -> who emits the data
    //  const pizzaObservale = new Observable((subscriber)=>{
    //   subscriber.next({name:'Darm House',vag:true});
    //   subscriber.next({name:'Margeria',vag:true});
    //   subscriber.next({name:'Barbecue chicken',vag:false});
    //   subscriber.complete();
    //  }).pipe(//to modify data
    //   filter((pizza:any)=>pizza.vag == true),
    //   map((pizza:any)=>pizza.name)//map iterate over all emited values
    //  )
    //  //subscriber/observer -> who consumes the emitted data
    //  pizzaObservale.subscribe({
    //   next:(value)=>console.log(value),
    //   error:(err)=>console.log(err.message),
    //   complete:()=>console.log("Done!")
    //  })

     //Observable -> who emits the data
     const pizzaObservale = new Observable((subscriber)=>{
      subscriber.next({name:'Darm House',vag:true,size:'small'});
      subscriber.next({name:'Margeria',vag:true,size:'large'});
      subscriber.next({name:'Barbecue chicken',vag:false,size:'medium'});
      subscriber.complete();
     }).pipe(//to modify data
      tap((pizza:any)=>{
        if(pizza.size == 'large')
        throw new Error("Large pizza not available")
      }),
      filter((pizza:any)=>pizza.vag == true),
      map((pizza:any)=>pizza.name)//map iterate over all emited values
     )
     //subscriber/observer -> who consumes the emitted data, we can remove next:,error:,complete:still it works
    //  pizzaObservale.subscribe({
    //   next:(value)=>console.log(value),
    //   error:(err)=>console.log(err.message),
    //   complete:()=>console.log("Done!")
    //  })

    const subject = new Subject<Number>();
    subject.subscribe((value)=>console.log("subscriber 1",value));
    subject.subscribe((value)=>console.log("subscriber 2",value));
    subject.next(10);
    subject.next(20);

    const behaviorSubject = new BehaviorSubject<string>('Initial value');
    behaviorSubject.subscribe((value)=>console.log(value));
    behaviorSubject.next("new value");
    } 
    ngOnDestroy(){
      if(this.typeAheadSub)
      this.typeAheadSub.unsubscribe();  
    }
}