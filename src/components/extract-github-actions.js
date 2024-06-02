import _ from "npm:lodash";

export function extractGitHubActionsFromRepository(repository = {}) {
    return reduceGHAFiles(repository.github_action_files).map((action) => {
        return {
            repo: repository.name,
            ...action
        }
    })
}

function reduceGHAFiles(ghaFiles) {
    return _.reduce(ghaFiles, (acc, gha, filename) => {
        acc = acc.concat(reduceJobs(gha.jobs).map((job)=> {
            return {
                filename: filename,
                ...job
            }
        }))

        return acc

    }, [])
}

 function reduceJobs(jobs) {
    const actionUsage = _.reduce(jobs, (acc, job, key) => {

        acc = acc.concat(reduceSteps(job.steps).map((step) => {
            console.log(step)
            return {
            ...step,
            jobId: key,
            ... (job.name && {jobName: job.name}),
            ..._.omit(job, ["name","on", "runs-on","permissions","strategy", "steps", "with", "env"])
            }
        }))

        return acc;
    }, [])

    return actionUsage;
 }

function reduceSteps(steps) {
 return _.reduce(steps, (acc, step) => {
    if(step.uses) {
        acc = acc.concat(_.omit(step, ["if","env", "with"]))
    }

    return acc;
 }, [])
}
