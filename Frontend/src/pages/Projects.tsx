import { useSelector } from 'react-redux'
// import ProjectShow from '../features/Projects/ProjectShow'
import { useGetProjectsByManagerIdQuery } from '../features/Projects/projectApi'
import { selectCurrentManagerId } from '../features/auth/userSlice'
import ProjectsDashboard from '../features/Projects/ProjectsDashboard';

const Projects = () => {
  const currentManagerId = useSelector(selectCurrentManagerId)
  console.log('currentManagerId', currentManagerId);

  const {
    data: projects,
    error,
    isLoading,
  } = useGetProjectsByManagerIdQuery(currentManagerId as string)

  if (!currentManagerId) {
    return <div>No current manager</div>
  }

  if (isLoading) return <div>Loading projects...</div>
  if (error) return <div>An error occurred while loading projects</div>

  return (
    <div>
      {/* <ProjectShow projects={sampleProjects || []} /> */}
      <ProjectsDashboard initialProjects={projects|| []} />
    </div>
  )
}

export default Projects
