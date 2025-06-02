import { useSelector } from 'react-redux'
import ProjectsDashboard from '../features/Projects/ProjectsDashboard'
import { selectCurrentManagerId } from '../features/auth/userSlice'
import useLoadProjectsOnInit from '../hooks/useLoadProjectsOnInit'
import type { RootState } from '../app/store'

const Projects = () => {
  useLoadProjectsOnInit(); 

  const currentManagerId = useSelector(selectCurrentManagerId)
  const projects = useSelector((state: RootState) => state.projects.projects)
  const isLoading = useSelector((state: RootState) => state.projects.isLoading)
  const error = useSelector((state: RootState) => state.projects.error)

  if (!currentManagerId) {
    return <div>No current manager</div>
  }

  if (isLoading) return <div>Loading projects...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      <ProjectsDashboard initialProjects={projects} />
    </div>
  )
}

export default Projects
