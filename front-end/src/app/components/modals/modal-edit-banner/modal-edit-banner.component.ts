import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ImgStorageService } from '../../../services/imgStorage.service';
import { PersonService } from '../../../services/person.service';

import { Person } from '../../../model/person';


@Component({
  selector: 'app-modal-edit-banner',
  templateUrl: './modal-edit-banner.component.html',
  styleUrls: ['./modal-edit-banner.component.scss']
})
export class ModalEditBannerComponent implements OnChanges {


  @Input() personToEdit?: Person;
  protected thePerson = new Person();

  @Output() editEvent = new EventEmitter<boolean>();
  protected isEdited: boolean = false;

  protected formGroup!: FormGroup;

  imagenes: any[] = [];
  imgBackUrl: any;
  imgUrl: any;


  constructor(private personService: PersonService, protected formBuilder: FormBuilder, private imgStorageService: ImgStorageService) {

  }


  ngOnChanges(): void {

    this.formGroup = this.formBuilder.group({
      name: [this.personToEdit?.getName, [Validators.required]],
      title: [this.personToEdit?.getTitle, [Validators.required]],
      location: [this.personToEdit?.getLocation, [Validators.required]],
      imgUrl: [this.personToEdit?.getImgUrl, [Validators.required]],
      imgBackUrl: [this.personToEdit?.getImgBackUrl, [Validators.required]],
      webUrl: [this.personToEdit?.getWebUrl, [Validators.required]]
    });

    // update thePerson if the personToEdit is a differnt one (different id, email, password)
    this.thePerson = this.personToEdit!;

  }



  protected get formControl(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }


  protected validateForm(event: Event): void {

    event.preventDefault();

    if (this.formGroup.valid) {
      this.onSubmit();
    } else {
      this.formGroup.markAllAsTouched();
      alert("Error. Revisar campos");
    }

  }


  protected onSubmit() {

    console.log("*** Editing Banner");


    this.thePerson.setName = this.formControl['name'].value;
    this.thePerson.setTitle = this.formControl['title'].value;
    this.thePerson.setLocation = this.formControl['location'].value;
    this.thePerson.setImgUrl = this.formControl['imgUrl'].value;
    this.thePerson.setImgBackUrl = this.formControl['imgBackUrl'].value;
    this.thePerson.setWebUrl = this.formControl['webUrl'].value;

    this.personService.updatePersonById(this.thePerson.getId!, this.thePerson).subscribe({

      next: (res) => {
        alert(res.message);
      },

      error: (err) => {
        const errorMessage = err.error.message ?? err.error ?? err;
        console.error(`--- Error. Edit Banner editModal: ${errorMessage}, Status: ${err.status}`,);
        alert(errorMessage)
        this.isEdited = false;
      },

      complete: () => {
        console.log("+++ Ok. Edit Banner complete");

        //reload and show all projects
        this.isEdited = true;
        this.editEmit(this.isEdited);
        //close modal
        document.getElementById("modalEditBannerClose")?.click()
      }

    });

  }


  protected editEmit(edited: boolean) {
    if (edited) {
      this.editEvent.emit(edited);
    }
  }


  cargarImagen(event: any, backImg: boolean) {
    let archivos = event.target.files;
    // let nombre: string = "sebastian";
    // let nombre: string = this.formGroup.get('name')?.value;
    let nombre = "";
    if (backImg) {
      nombre = "imgBanner";
    } else {
      nombre = "imgProfile";
    }

    for (let i = 0; i < archivos.length; i++) {

      let reader = new FileReader();

      reader.readAsDataURL(archivos[0]);
      reader.onloadend = () => {
        // this.imagenes.push(reader.result);

        this.imgStorageService.subirImagen(nombre + "_" + Date.now(), reader.result).then(urlImagen => {
          let usuario = {
            imgProfile: urlImagen
          }
          if (backImg) {
            this.imgBackUrl = urlImagen;
            this.formGroup.get('imgBackUrl')?.setValue(this.imgBackUrl);
            // this.personToEdit!.setImgBackUrl = this.imgBackUrl;
            this.imagenes[0] = reader.result;
          } else {
            this.imgUrl = urlImagen;
            this.formGroup.get('imgUrl')?.setValue(this.imgUrl);
            // this.personToEdit!.setImgUrl = this.imgUrl;
            this.imagenes[1] = reader.result;
          }
          // this.ngOnChanges();
          console.log(usuario);
        })
      }

    }


  }


}


