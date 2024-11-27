// types.ts
type JobType = 'full-time' | 'part-time' | 'intern';
type LocationType = 'remote' | 'on-site';

interface Job {
  id: string;
  title: string;
  description: string;
  type: JobType;
  location: LocationType;
  link: string;
  postedDate: string;
}