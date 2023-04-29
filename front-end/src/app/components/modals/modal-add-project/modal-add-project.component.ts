import { Component, OnInit } from '@angular/core';
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
export class ModalAddProjectComponent implements OnInit {


  protected formGroup: FormGroup;

  protected id: number | undefined;

  protected name: string = "";

  protected date: string = "";
  protected shortDescription: string = "";
  protected longDescription: string = "";
  protected logoUrl: string = "";
  protected imgUrl: string = "";
  protected webUrl: string = "";

  protected person: Person = new Person();


  public constructor(protected formBuilder: FormBuilder, private projectService: ProjectService, private router: Router, private activatedRoute: ActivatedRoute) {

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


  protected get formControl(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }


  protected onSubmit() {

    

    // const projectConstructor: ProjectData = {
    const projectConstructor = {
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
    
    
    projectConstructor.person.setId = 1;
    const theProject = Object.assign(new Project(), projectConstructor);
    // const theProject = new Project(projectConstructor);

    console.log("log from if valid");
    this.projectService.createProjectByPersonId(1, theProject).subscribe({
      next: (data) => {
        console.log("the return of create: ", data);

        // window.location.reload();
        // alert("Proyecto cargado: " + theProject.getName);
        this.formGroup.reset();
        // this.router.navigate([this.router.url])
        // this.router.navigate([this.activatedRoute.snapshot.url.join('/')]);
      }
    })
    console.log("log from after form creation");

  }


  protected validateForm(event: Event): boolean {

    console.log("log from onSubmit start");
    event.preventDefault
    console.log("log from after prevent default");

    if (this.formGroup.valid) {
      console.log("form validated: ", this.formControl['value']);
      this.onSubmit();
      return true;
    } else {
      console.log("form not validated: ", JSON.stringify(this.formControl['value']));
      this.formGroup.markAllAsTouched();
      alert("revisar campos");
      return false;
    }

  }


  protected clearForm(): void {
    this.formGroup.reset();
  }




}
