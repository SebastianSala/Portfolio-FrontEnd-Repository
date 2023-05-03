import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { Project } from '../../../model/project';
import { ProjectService } from '../../../services/project.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from '../../../model/person';
import { ProjectData } from '../../../model/data';


@Component({
  selector: 'app-modal-edit-project',
  templateUrl: './modal-edit-project.component.html',
  styleUrls: ['./modal-edit-project.component.scss']
})
export class ModalEditProjectComponent implements OnInit, OnChanges {


  @Input() projectToEdit!: Project;
  protected isEdited: boolean = false;

  @Output() editEvent = new EventEmitter<boolean>();

  protected formGroup!: FormGroup;

  protected person = new Person();



  constructor(private projectService: ProjectService, protected formBuilder: FormBuilder) {

    console.log("the Project to Edit from edit modal from constructor: ", this.projectToEdit);
  }


  ngOnInit(): void {

    console.log("the Project to Edit from edit modal: ", this.projectToEdit);

    // this.formGroup = this.formBuilder.group({
    //   name: [this.projectToEdit.getName, [Validators.required]],
    //   date: [this.projectToEdit.getDate, [Validators.required]],
    //   shortDescription: [this.projectToEdit.getShortDescription, [Validators.required]],
    //   longDescription: [this.projectToEdit.getLongDescription, [Validators.required]],
    //   logoUrl: [this.projectToEdit.getLogoUrl, [Validators.required]],
    //   webUrl: [this.projectToEdit.getWebUrl, [Validators.required]]
    // })
    // console.log("the Project to Edit from edit modal formGroup: ", this.formGroup.get('name')?.value);

  }

  ngOnChanges(changes: SimpleChanges): void {

    console.log("el prosh from ngOnChanges: ", this.projectToEdit);

    this.formGroup = this.formBuilder.group({
      name: [this.projectToEdit.getName, [Validators.required]],
      date: [this.projectToEdit.getDate, [Validators.required]],
      shortDescription: [this.projectToEdit.getShortDescription, [Validators.required]],
      longDescription: [this.projectToEdit.getLongDescription, [Validators.required]],
      logoUrl: [this.projectToEdit.getLogoUrl, [Validators.required]],
      imgUrl: [this.projectToEdit.getImgUrl, [Validators.required]],
      webUrl: [this.projectToEdit.getWebUrl, [Validators.required]]
    })
    console.log("the Project to Edit from edit modal formGroup: ", this.formGroup.get('name')?.value);

  }


  protected get formControl(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }


  protected update(event: Event) {
    console.log("el nuevo prosh", this.projectToEdit);
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


  protected onSubmit() {



    const projectConstructor: ProjectData = {
      // const projectConstructor = {
      //setting id to 0 to create a new project instead of updating an existing one
      // id: 0,
      //setting id to projectToEdit.getId to update an existing project instead of creating a new one
      id: this.projectToEdit.getId!,
      name: this.formControl['name'].value,
      date: this.formControl['date'].value,
      shortDescription: this.formControl['shortDescription'].value,
      longDescription: this.formControl['longDescription'].value,
      logoUrl: this.formControl['logoUrl'].value,
      imgUrl: this.formControl['imgUrl'].value,
      webUrl: this.formControl['webUrl'].value,
      // person: new Person()
      person: this.projectToEdit.getPerson
    }

    // const project = Object.assign(new Project(), projectConstructor);


    //set the person to the only person relevant for this portfolio project
    //but the backend allows creation of multiple persons with its corresponding projects, experiences, etc and proper relationships between them.
    // projectConstructor.person.setId = 1;

    //setting the person of the project to it own person
    // projectConstructor.person.setId = this.projectToEdit.getPerson.getId;

    // const theProject = Object.assign(new Project(), projectConstructor);
    const theProject = new Project(projectConstructor);

    console.log("log from if valid");
    // this.projectService.createProjectByPersonId(1, theProject).subscribe({
    this.projectService.updateProjectByPersonIdByProjectId(theProject.getPerson.getId!, theProject.getId!, theProject).subscribe({
      next: (data) => {
        console.log("the return of create: ", data);

        // window.location.reload();
        // alert("Proyecto cargado: " + theProject.getName);

        // this.formGroup.reset();
        
        // this.router.navigate([this.router.url])
        // this.router.navigate([this.activatedRoute.snapshot.url.join('/')]);
      },
      error: (err) => {
        console.log("Error from Create Project addModal: ", err);
        this.isEdited = false;

      },
      complete: () => {
        // window.location.reload();
        // alert(`Projecto creado: ${theProject.getName}`)
        //reload and show all projects
        this.isEdited = true;
        this.editEmit(this.isEdited);
        //close modal
        document.getElementById("modalEditClose")?.click()
      },
    })
    console.log("log from after form creation");

  }


  protected editEmit(edited: boolean) {
    if (edited) {
      console.log("Emiting from modal add: ", edited);
      this.editEvent.emit(edited);
    }
  }



}
