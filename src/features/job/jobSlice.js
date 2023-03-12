import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteJob, getJobs, postJob, putJob } from "./jobAPI";

// initialize state
const initialState = {
  jobs: [],
  isLoading: false,
  isError: false,
  error: "",
  editing: {},
};

export const fetchJobs = createAsyncThunk("job/fetchJobs", async () => {
  const response = await getJobs();
  return response;
});

export const createJob = createAsyncThunk("job/createJob", async (data) => {
  const response = await postJob(data);
  return response;
});
export const editJob = createAsyncThunk("job/editJob", async ({ id, data }) => {
  const response = await putJob(id, data);
  return response;
});

export const removeJob = createAsyncThunk("job/removeJob", async (id) => {
  const response = await deleteJob(id);
  return response;
});

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.editing = action.payload;
    },
    editInactive: (state) => {
      state.editing = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.jobs = [];
        state.error = action.error.message;
      })
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs.push(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(editJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const indexToUpdate = state.jobs.findIndex(
          (job) => job.id === action.payload.id
        );
        state.jobs[indexToUpdate] = action.payload;
      })
      .addCase(editJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(removeJob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(removeJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.jobs = state.jobs.filter((job) => job.id !== action.meta.arg);
      })
      .addCase(removeJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export default jobSlice.reducer;
export const { editActive, editInactive } = jobSlice.actions;
