import { ReactNode } from "react";


export interface Job{


 JobTitle?: string;
  JobType?: string;
  EmploymentType?: string;
  Location?: string;
  Description?: string;
  ApplicationDeadline?: string;
  Experience?: string;
  Responsibilities?: Responsibility[];
  Qualifications?: Qualification[];
  children?:React.ReactNode;
}
export interface Responsibility{
    title:string;
    description:string;
} 

export interface Qualification {
  title: string;
  description: string;
}