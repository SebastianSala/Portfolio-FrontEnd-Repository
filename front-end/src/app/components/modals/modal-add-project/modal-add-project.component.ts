import { Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from '../../../model/person';
import { ProjectData } from 'src/app/model/data';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modal-add-project',
  templateUrl: './modal-add-project.component.html',
  styleUrls: ['./modal-add-project.component.scss']
})
export class ModalAddProjectComponent implements OnInit, OnChanges {

  @Output() addEvent = new EventEmitter<boolean>;
  protected isAdded: boolean = false;

  protected formGroup: FormGroup;

  // protected id: number | undefined;

  // protected name: string = "";

  // protected date: string = "";
  // protected shortDescription: string = "";
  // protected longDescription: string = "";
  // protected logoUrl: string = "";
  // protected imgUrl: string = "";
  // protected webUrl: string = "";

  protected person: Person = new Person();


  public constructor(protected formBuilder: FormBuilder, private projectService: ProjectService) {

    //creation of form's form controls group
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      date: ['', [Validators.required]],
      shortDescription: ['', [Validators.required]],
      longDescription: ['', [Validators.required]],
      logoUrl: ['', [Validators.required]],
      imgUrl: ['', [Validators.required]],
      webUrl: ['', [Validators.required]],
    })

  }


  ngOnInit(): void {

    console.log("calling from modal add project: ", this.formControl['name']);
    
  }
  
  ngOnChanges(): void {
    console.log("calling from modal add project: ", this.formControl['name']);
  }


  protected get formControl(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }


  protected addEmit(added: boolean) {
    if (added) {
      console.log("Emiting from modal add: ", added);
      this.addEvent.emit(added);
    }
  }


  protected onSubmit() {



    const projectConstructor: ProjectData = {
      // const projectConstructor = {
      //setting id to 0 to create a new project instead of updating an existing one
      id: 0,
      name: this.formControl['name'].value,
      date: this.formControl['date'].value,
      shortDescription: this.formControl['shortDescription'].value,
      longDescription: this.formControl['longDescription'].value,
      logoUrl: this.formControl['logoUrl'].value,
      imgUrl: this.formControl['imgUrl'].value,
      webUrl: this.formControl['webUrl'].value,
      person: new Person()
    }

    // const project = Object.assign(new Project(), projectConstructor);


    //set the person to the only person relevant for this portfolio project
    //but the backend allows creation of multiple persons with its corresponding projects, experiences, etc and proper relationships between them.
    projectConstructor.person.setId = 1;

    // const theProject = Object.assign(new Project(), projectConstructor);
    const theProject = new Project(projectConstructor);

    console.log("log from if valid");
    this.projectService.createProjectByPersonId(1, theProject).subscribe({
      next: (data) => {
        console.log("the return of create: ", data);

        // window.location.reload();
        // alert("Proyecto cargado: " + theProject.getName);
        this.formGroup.reset();
        // this.router.navigate([this.router.url])
        // this.router.navigate([this.activatedRoute.snapshot.url.join('/')]);
      },
      error: (err) => {
        console.log("Error from Create Project addModal: ", err);
        this.isAdded = false;

      },
      complete: () => {
        // window.location.reload();
        // alert(`Projecto creado: ${theProject.getName}`)
        //reload and show all projects
        this.isAdded = true;        
        this.addEmit(this.isAdded);
        //close modal
        document.getElementById("modalClose")?.click()
      },
    })
    console.log("log from after form creation");

  }


  protected validateForm(event: Event): void {

    console.log("log from onSubmit start");
    event.preventDefault();
    console.log("log from after prevent default");

    if (this.formGroup.valid) {
      console.log("form validated: ", this.formControl['value']);
      this.onSubmit();
      // return true;
    } else {
      console.log("form not validated: ", JSON.stringify(this.formControl['value']));
      this.formGroup.markAllAsTouched();
      alert("revisar campos");
      // document.getElementById("cancelButton")?.click()
      // return false;
    }

  }


  protected clearForm(): void {
    this.formGroup.reset();
  }




}
