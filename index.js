const orderedJobs = jobs => {

    if (!jobs) return []
    const jobsList = []

    //Convert string to an object
    const jobsObj = JSON.parse(jobs)

    for (const job in jobsObj){
        
        //Save job dependency in a variable
        const dependency = jobsObj[job]

        //Check if job has dependency, if it's not in the jobsList add it otherwise ignore 
        if (!dependency){
            !jobsList.includes(job) 
                ? jobsList.push(job) 
                : null  
        }

        //if there is a job dependecy push to jobsList in the right position
        if (dependency) {
            const dependencyIndex = jobsList.indexOf(job)
            const jobIndex = jobsList.indexOf(dependency)
            
            //check if jobs exists in jobsList
            jobsList.includes(job)
                //if positive, include dependency in the right position
                ? jobsList.splice(dependencyIndex, 0, dependency)
                //check if dependency exists
                : jobsList.includes(dependency)
                //if positive, include job in the right position
                ? jobsList.splice(jobIndex + 1, 0, job)
                //if not, include job first and then the dependecy
                : jobsList.push(dependency, job)
                    
        }
    }
        return jobsList
}

module.exports = {orderedJobs}
