import {JobSeekerFilter} from "./JobSeekerFilter";

export class JobSeekerInputPagination {
  pageIndex: number = 0
  pageSize: number = 10
  jobSeekerFilter: JobSeekerFilter = new JobSeekerFilter()
}
