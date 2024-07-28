import {
  handleCreatejob,
  handleDeleteJob,
  handleGetJob,
  handleGetJobs,
  handleUpdateJob,
} from "../controllers/jobController.js"
import express from "express"
export const JobRoute = express.Router()

JobRoute.route("/").get(handleGetJobs).post(handleCreatejob)

JobRoute.route("/:id")
  .get(handleGetJob)
  .patch(handleUpdateJob)
  .delete(handleDeleteJob)
