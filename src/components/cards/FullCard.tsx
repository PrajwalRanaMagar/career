import React from 'react'

import {Card, CardHeader, CardBody, CardFooter} from "./cards"
import jobs from "../../jobs.json";
const FullCard = () => {
    const selectedJobs=[jobs[0],jobs[3],jobs[2],jobs[5]];
  return (
    <div>
{selectedJobs.map((job,index)=>{
return <Card key={index}>
<CardHeader>
    <h1>{job.jobTitle}</h1>
    <button>Apply Now</button>
</CardHeader>
<CardBody>
    <span>Job Type:{job.jobType}</span>
    <p>{job.description}</p>
</CardBody>
<CardFooter>
 <span></span>
  <span>Work Arrangement: {job.workArrangement}</span>
</CardFooter>
</Card>


})}


    </div>
  )
}

export default FullCard