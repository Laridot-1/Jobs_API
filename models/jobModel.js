import mongoose, { model, Schema } from "mongoose"

const JobSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 200,
    },
    status: {
      type: String,
      enum: ["interviewed", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true }
)

const Job = model("Job", JobSchema)

const createJob = (job) => {
  return new Promise((resolve) => {
    const newJob = Job.create(job)
    resolve(newJob)
  })
}

const getJobs = (userId) => {
  return new Promise((resolve) => {
    const jobs = Job.find({ createdBy: userId }).sort("createdAt")
    resolve(jobs)
  })
}

const getJob = (jobId, userId) => {
  return new Promise((resolve) => {
    const job = Job.findOne({ _id: jobId, createdBy: userId })
    resolve(job)
  })
}

const updateJob = (jobId, userId, fields) => {
  return new Promise((resolve) => {
    const job = Job.findOneAndUpdate(
      { _id: jobId, createdBy: userId },
      fields,
      { new: true, runValidators: true }
    )
    resolve(job)
  })
}

const deleteJob = (jobId, userId) => {
  return new Promise((resolve) => {
    const job = Job.findOneAndDelete({ _id: jobId, createdBy: userId })
    resolve(job)
  })
}

export { createJob, getJobs, getJob, updateJob, deleteJob }
