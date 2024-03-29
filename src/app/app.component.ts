import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode = 'list';
  //criando uma variavel, os : e pra tipar a variavel
  //o tipo any significa qualuqer coisa
  // o [] significa que e um arrey
  //minhas variaveis
  public todos: Todo[] = [];
  public title: String = 'Minhas Tarefas';
  public form: FormGroup;


  //ctor e um atalho pra criar contrutor
  //contrutor e chamado toda vez que o metodo inicia
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required,
      ])]
    });

  this.load();

    //toda vez que eu uso o this, tenho acesso a todas as variaveis
    //e todo o escolpo da classe
    //o metodo push () e pra adicionar um item a um array
    //this.todos.push(new Todo(1, 'Passear com o cachorro', false));
    //this.todos.push(new Todo(2, 'Ir no supermercado', false));
   // this.todos.push(new Todo(3, 'Corta o cabelo', true));
  }

  add(){
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
  }

  clear(){
    this.form.reset();
  }

  remove(todo: Todo){
    const index = this.todos.indexOf(todo);
    if(index !== -1){
      this.todos.splice(index, 1);
    }
    this.save();
  }

  markAsDone(todo: Todo){
    todo.done = true;
  }

  markAsUndone(todo: Todo){
    todo.done = false;
    this.save();
  }

  save(){
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }

  load(){
    const data = localStorage.getItem('todos')
    if(data){
    this.todos = JSON.parse(data);
  } else {
    this.todos = [];
  }
  }

  changeMode(mode: string){
    this.mode = mode;
  }

}
