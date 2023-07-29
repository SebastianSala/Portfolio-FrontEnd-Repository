import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const dateRangeValidator: ValidatorFn =
    (control: AbstractControl): ValidationErrors | null => {

        const startDate = control.get('startDate')?.value;
        const endDate = control.get('endDate')?.value;

        if (startDate && endDate && endDate <= startDate) {
            // console.log("dates invalid");
            return { dateRangeInvalid: true };
        }
        // console.log("dates valid");
        return null;
    }