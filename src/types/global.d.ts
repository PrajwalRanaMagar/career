import { ReactNode } from "react";


export interface Job{

EmploymentType?:string | undefined;
 JobTitle?: string ;
  JobType?: string;
  EmploymentType?: string;
  Location?: string;
  Description?: string;
  Status?:string;
  ApplicationDeadline?: string;
  Experience?: string;
  Responsibilities?: Responsibility[];
  Qualifications?: Qualification[];
}
export interface Responsibility{
    title:string;
    description:string;
} 

export interface Qualification {
  title: string;
  description: string;
}