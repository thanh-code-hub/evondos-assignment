export interface PatientDTO {
    id?: number;
    name: string;
    dob: string;
    condition: string;
    next_appointment?: string;
}