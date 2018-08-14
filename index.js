const orderedJobs = jobs => {

    if (!jobs) return []
    const jobsList = []

    //Convert string to an object
    const jobsObj = JSON.parse(jobs)

    for (const job in jobsObj){
        
        //Save job dependency in a variable
        const dependency = jobsObj[job]

        if (!dependency){
            !jobsList.includes(job) 
                ? jobsList.push(job) 
                : null  
        }
    }
        return jobsList
}

module.exports = {orderedJobs}