import {
  createJob,
  deleteJob,
  getJob,
  getJobs,
  updateJob,
} from "../models/jobModel.js"
import { StatusCodes } from "http-status-codes"
import { BadRequestError, NotFoundError } from "../errors/index.js"

const handleGetJobs = async (req, res) => {
  const jobs = await getJobs(req.user.userId)
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

const handleGetJob = async (req, res) => {
  const job = await getJob(req.params.id, req.user.userId)

  if (!job) {
    throw new NotFoundError(`No job with id - ${req.params.id}`)
  }

  res.status(StatusCodes.OK).json({ job })
}

const handleCreatejob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await createJob(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

const handleUpdateJob = async (req, res) => {
  if (!req.body.company?.trim() || !req.body.position?.trim()) {
    throw new BadRequestError("Company or position field cannot be empty")
  }

  const job = await updateJob(req.params.id, req.user.userId, req.body)

  if (!job) {
    throw new NotFoundError(`No job with id - ${req.params.id}`)
  }

  res.status(StatusCodes.OK).json({ job })
}

const handleDeleteJob = async (req, res) => {
  const job = await deleteJob(req.params.id, req.user.userId)

  if (!job) {
    throw new NotFoundError(`No job with id - ${req.params.id}`)
  }

  res.status(StatusCodes.OK).send()
}

export {
  handleGetJobs,
  handleGetJob,
  handleCreatejob,
  handleUpdateJob,
  handleDeleteJob,
}
