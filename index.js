exports.orderedJobs = jobs => {

    //Return empty array if no jobs are passed 
    if (!jobs) return []

    const jobsList = []

    //Convert string to an object
    const jobsObj = JSON.parse(jobs)

    for (const job in jobsObj) {

        //Save job dependency in a variable, if it exists
        const dependency = jobsObj[job]

            //Checking if it's a valid job
            if (job === dependency){
                throw new Error('Jobs can’t depend on themselves.')
            } 
            if (jobsList.includes(job) && jobsList.includes(dependency)){
                throw new Error('Sequence contains a circular set of dependencies.')
            }

            //Check if job has dependency, if it's not in the jobsList add it, otherwise ignore 
            if (!dependency) {
                !jobsList.includes(job)
                    ? jobsList.push(job)
                    : null
            }
            //If there is a job dependency push to jobsList in the right position
            if (dependency) {
                //Get index position of job and dependency in order to includes element in the right position
                const dependencyIndex = jobsList.indexOf(job)
                const jobIndex = jobsList.indexOf(dependency)

                //Check if jobs exists in jobsList
                jobsList.includes(job)
                    //If positive, include dependency in the right position
                    ? jobsList.splice(dependencyIndex, 0, dependency)
                    //Check if dependency exists
                    : jobsList.includes(dependency)
                        //If positive, include job in the right position
                        ? jobsList.splice(jobIndex + 1, 0, job)
                        //If not, include dependency first and then the job
                        : jobsList.push(dependency, job)
            }
    }
    return jobsList
}