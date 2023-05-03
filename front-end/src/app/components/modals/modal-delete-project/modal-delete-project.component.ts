import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// import { Person } from '../../../model/person';
import { Project } from '../../../model/project';
import { ProjectService } from '../../../services/project.service';
import { PersonService } from 'src/app/services/person.service';
import { HttpResponse } from '@angular/common/http';
import { ResponseData } from 'src/app/model/data';


@Component({
  selector: 'app-modal-delete-project',
  templateUrl: './modal-delete-project.component.html',
  styleUrls: ['./modal-delete-project.component.scss']
})
export class ModalDeleteProjectComponent implements OnInit {


  @Input() projectToDelete!: Project;
  protected isDeleted: boolean = false;

  @Output() deleteEvent = new EventEmitter<boolean>();


  constructor(private projectService: ProjectService, private personService: PersonService) {

    console.log("Modal contructor", this.projectToDelete);

  }


  ngOnInit(): void {

    console.log("Modal ngOnInit", this.projectToDelete);

  }


  public deleteEmit(value: boolean) {
    this.deleteEvent.emit(value);
    console.log("emiting from modal delte: ", value);    
  }


  deleteProject(event: Event): void {

    console.log("the target of the event is: ", event.target);

    // const modalElement = document.getElementById(event.target as string)
    // const modalElement = document.getElementById('modalDeleteProject');
    // modalElement!.style.display = 'none';

    console.log("Modal delteProject", this.projectToDelete);

    this.delete();
    
    // if (confirm(`Borrar el projecto ${this.projectToDelete?.getName}?`)) {
    //   this.delete();
    //   alert("Borrando Projecto")
    // } else {
    //   alert("No se borrará el Projecto")
    // }
  }

  delete(): void {

    console.log("Modal delte person id: ", this.projectToDelete.getPerson.getId);
    console.log("Modal delte project id: ", this.projectToDelete.getId);

    const result = this.projectService.deleteProjectByPersonIdByProjectId(this.projectToDelete.getPerson.getId as number, this.projectToDelete.getId as number).subscribe({
      // const result = this.projectService.deleteProjectByProjectId(this.projectToDelete.getId as number);
      // const result = this.personService.deletePersonById(this.projectToDelete.getPerson.getId as number + 2)

      next: (data) => {
        console.log("deleted: ", data.body);

      },
      error: (err) => {
        console.log("Error from delete project method in modal: ", err.error);
        this.isDeleted = false;
        this.deleteEmit(this.isDeleted);
      },
      complete: () => {
        console.log("deletion completed!");
        // alert("Projecto eliminado: " + this.projectToDelete.getName)
        // window.location.reload();
        this.isDeleted = true;
        this.deleteEmit(this.isDeleted);
        // this.ngOnInit();
      }
    })

    //console.log("the Complete Result of delte in modal is: ", result);    

    //window.location.reload();
  }


}
