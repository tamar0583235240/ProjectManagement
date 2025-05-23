const sampleProjects = [
  {
    _id: '1',
    project_name: 'Website Redesign',
    description: 'Complete overhaul of the corporate website with new design and improved UX',
    start_date: new Date('2025-03-15'),
    deadline: new Date('2025-06-30'),
    status: { 
      _id: 'status1', 
      name: 'In Progress',
      color: '#00ACC1' // Teal
    },
    project_manager_id: {
      _id: 'user1',
      name: 'Sarah Johnson',
      avatar: ''
    },
    organization_id: {
      _id: 'org1',
      name: 'TechCorp'
    },
    createdAt: new Date('2025-03-10'),
    updatedAt: new Date('2025-05-15')
  },
  {
    _id: '2',
    project_name: 'Mobile App Development',
    description: 'Creating a native mobile application for iOS and Android platforms',
    start_date: new Date('2025-02-01'),
    deadline: new Date('2025-07-15'),
    status: { 
      _id: 'status1', 
      name: 'In Progress',
      color: '#00ACC1' // Teal
    },
    project_manager_id: {
      _id: 'user2',
      name: 'Michael Chen',
      avatar: ''
    },
    organization_id: {
      _id: 'org1',
      name: 'TechCorp'
    },
    createdAt: new Date('2025-01-25'),
    updatedAt: new Date('2025-05-10')
  },
  {
    _id: '3',
    project_name: 'Digital Marketing Campaign',
    description: 'Launch of Q2 marketing campaign across social media platforms',
    start_date: new Date('2025-04-01'),
    deadline: new Date('2025-05-15'),
    status: { 
      _id: 'status2', 
      name: 'Completed',
      color: '#4CAF50' // Green
    },
    project_manager_id: {
      _id: 'user3',
      name: 'Jessica Lee',
      avatar: ''
    },
    organization_id: {
      _id: 'org1',
      name: 'TechCorp'
    },
    createdAt: new Date('2025-03-25'),
    updatedAt: new Date('2025-05-16')
  },
  {
    _id: '4',
    project_name: 'CRM Integration',
    description: 'Integration of new CRM system with existing company infrastructure',
    start_date: new Date('2025-03-01'),
    deadline: new Date('2025-05-01'),
    status: { 
      _id: 'status3', 
      name: 'Delayed',
      color: '#F44336' // Red
    },
    project_manager_id: {
      _id: 'user4',
      name: 'David Smith',
      avatar: ''
    },
    organization_id: {
      _id: 'org2',
      name: 'ConsultingPlus'
    },
    createdAt: new Date('2025-02-25'),
    updatedAt: new Date('2025-05-02')
  },
  {
    _id: '5',
    project_name: 'Data Analytics Platform',
    description: 'Development of a comprehensive data analytics platform for business intelligence',
    start_date: new Date('2025-01-15'),
    deadline: new Date('2025-08-30'),
    status: { 
      _id: 'status1', 
      name: 'In Progress',
      color: '#00ACC1' // Teal
    },
    project_manager_id: {
      _id: 'user5',
      name: 'Alex Rivera',
      avatar: ''
    },
    organization_id: {
      _id: 'org2',
      name: 'ConsultingPlus'
    },
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-05-01')
  },
  {
    _id: '6',
    project_name: 'E-commerce Platform',
    description: 'Building a complete e-commerce solution with payment processing',
    start_date: new Date('2025-02-15'),
    deadline: new Date('2025-09-01'),
    status: { 
      _id: 'status4', 
      name: 'Planning',
      color: '#FFC107' // Amber/Yellow
    },
    project_manager_id: {
      _id: 'user6',
      name: 'Emma Wilson',
      avatar: ''
    },
    organization_id: {
      _id: 'org3',
      name: 'RetailSolutions'
    },
    createdAt: new Date('2025-02-10'),
    updatedAt: new Date('2025-05-05')
  },
  {
    _id: '7',
    project_name: 'Security Audit',
    description: 'Comprehensive security audit of all IT systems and infrastructure',
    start_date: new Date('2025-04-15'),
    deadline: new Date('2025-05-31'),
    status: { 
      _id: 'status1', 
      name: 'In Progress',
      color: '#00ACC1' // Teal
    },
    project_manager_id: {
      _id: 'user7',
      name: 'Robert Kim',
      avatar: ''
    },
    organization_id: {
      _id: 'org1',
      name: 'TechCorp'
    },
    createdAt: new Date('2025-04-10'),
    updatedAt: new Date('2025-05-10')
  },
  {
    _id: '8',
    project_name: 'HR System Implementation',
    description: 'Implementation of new HR management system across all departments',
    start_date: new Date('2025-03-01'),
    deadline: new Date('2025-07-01'),
    status: { 
      _id: 'status1', 
      name: 'In Progress',
      color: '#00ACC1' // Teal
    },
    project_manager_id: {
      _id: 'user8',
      name: 'Sophia Garcia',
      avatar: ''
    },
    organization_id: {
      _id: 'org4',
      name: 'GlobalServices'
    },
    createdAt: new Date('2025-02-25'),
    updatedAt: new Date('2025-05-10')
  }
];

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
    return <div>אין מנהל נוכחי</div>
  }

  if (isLoading) return <div>טוען פרויקטים...</div>
  if (error) return <div>אירעה שגיאה בעת טעינת הפרויקטים</div>

  return (
    <div>
      {/* <ProjectShow projects={sampleProjects||[]} /> */}
      <ProjectsDashboard initialProjects={sampleProjects} />
    </div>
  )
}

export default Projects

