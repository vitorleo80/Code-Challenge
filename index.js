const orderedJobs = jobs => {

    //return empty array if no jobs are passed 
    if (!jobs) return []
    
    const jobsList = []

    //Convert string to an object
    const jobsObj = JSON.parse(jobs)

    for (const job in jobsObj){
        
        //Save job dependency in a variable, if it exists
        const dependency = jobsObj[job]

        //checking if it's a valid job
        if (job === dependency) return `Error: Jobs can’t depend on themselves.`
        if (jobsList.includes(job) && jobsList.includes(dependency)) return `Error: sequence contains a circular set of dependencies.`

        //Check if job has dependency, if it's not in the jobsList add it, otherwise ignore 
        if (!dependency){
            !jobsList.includes(job) 
                ? jobsList.push(job) 
                : null  
        }

        //if there is a job dependecy push to jobsList in the right position
        if (dependency) {
            //get index position of job and dependency in order to includes element in the right position
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
                //if not, include job first and then the dependency
                : jobsList.push(dependency, job)
                    
        }
    }
        return jobsList
}

module.exports = {orderedJobs}
