import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
// ==================create jobs ==============================
export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("Please Provide All Fields");
  }
  req.body.createdBy = req.user.userId;
  const job = await jobsModel.create(req.body);
  res.status(201).json({ job });
};
// ========================GET JOBS :: Job Portal by Sourabh Jaiswal================================
export const getAllJobsController = async (req, res, next) => {
  const jobs = await jobsModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    totalJobs: jobs.length,
    jobs,
  });
};
//====================================== UPDATE JOBS: :: job update by sourabh jaiswal===================
export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;
  //validation:-
  if (!company || !position) {
    next("Please Provide All Fields");
  }
  //find job:-
  const job = await jobsModel.findOne({ _id: id });
  //validation:-
  if (!job) {
    next(`No jobs found with this id: ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("You are Not Authorized to update this Job");
    return;
  }
  const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  //res:-
  res.status(200).json({ updateJob });
};
//=================================DELETE JOBS:: BY SOURABH JAISWAL=======================================
export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  //find jobs:-
  const job = await jobsModel.findOne({ _id: id });
  //validation:
  if (!job) {
    next(`No Job Found With This ID : ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("You are not Authorized to Delete this Job ");
    return;
  }
  await job.deleteOne();
  res.status(200).json({ message: "Success! : Job Deleted " });
};
//================================= JOBS STATS AND FILTER:: BY SOURABH JAISWAL=============================
export const jobStatsController = async (req, res, next) => {
  const stats = await jobsModel.aggregate([
    //search by user jobs:-
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
  ]);
  res.status(200).json({ stats });
};
