import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { ClipboardList, Users, LayoutDashboard, Shield, UserCog, Bell, BarChart3, CheckSquare, ChevronRight } from 'lucide-react';// import { Heebo } from 'next/font/google'

import "../style/LandingPage.css"
import PicManagementSystem from '../assets/PicManagementSystem.jpg';
import PicSmartAndIntuitiveDashboard from '../assets/PicSmartAndIntuitiveDashboard.jpg';
import PicEasyAndSecureLogin from '../assets/PicEasyAndSecureLogin.jpg';
import SignIn from '../features/auth/SignIn';
import { SignUp } from '../features/auth/SignUp';
const LandingPage = () => {
    const navigate = useNavigate();
    const [openSignUpDialog, setOpenSignUpDialog] = React.useState(false)
    const [openSignInDialog, setOpenSignInDialog] = React.useState(false)

    const handleSignUpClick = () => {
        setOpenSignUpDialog(true)
    }

    const handleCloseSignUpDialog = () => {
        setOpenSignUpDialog(false)
    }

    const handleSignInClick = () => {
        setOpenSignInDialog(true)
    }

    const handleCloseSignInDialog = () => {
        setOpenSignInDialog(false)
    }

    const handleSuccessfulSignIn = () => {
        navigate('/app');
    }

    const handleSuccessfulSignUp = () => {
        navigate('/app');
    }

    return (
        <div className="landing-page">
            <main>
                <section className="hero">
                    <div className="hero-content">
                        <h1>Hierarchical Task Management System</h1>
                        <p>
                            A comprehensive solution for managing projects and tasks for organizations with a hierarchical structure. The system allows managers, team leaders
                            and employees to work efficiently and in a synchronized manner.
                        </p>
                        <div className="hero-buttons">
                            <button className="cta-btn" onClick={handleSignInClick}>Sign In</button>
                            <button className="secondary-btn" onClick={handleSignUpClick}>Sign Up</button>
                        </div>
                    </div>
                    <div className="hero-image">
                        <div className="dashboard-container">
                            <img
                                src={PicManagementSystem}
                                width={600}
                                height={500}
                                alt="Dashboard"
                                className="dashboard-img"
                            />
                            <div className="floating-elements">
                                <div className="floating-element chart">
                                    <div className="chart-icon">
                                        <BarChart3 size={20} />
                                    </div>
                                </div>
                                <div className="floating-element users">
                                    <div className="users-icon">
                                        <Users size={20} />
                                    </div>
                                </div>
                                <div className="floating-element tasks">
                                    <div className="tasks-icon">
                                        <ClipboardList size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="role-features">
                    <h2>Adapted to all positions in the organization</h2>

                    <div className="role-cards">
                        <div className="role-card manager">
                            <div className="role-icon">
                                <Shield className="icon" />
                            </div>
                            <h3>Manager</h3>
                            <ul>
                                <li>Comprehensive Project Management</li>
                                <li>Add Team Leaders</li>
                                <li>Assign Tasks to Projects</li>
                                <li>Full Progress Tracking</li>
                                <li>Generate Performance Reports</li>
                            </ul>
                            <div className="card-footer">
                                <a href="#manager" className="learn-more">
                                    Learn More <ChevronRight size={16} />
                                </a>
                            </div>
                        </div>

                        <div className="role-card team-lead">
                            <div className="role-icon">
                                <UserCog className="icon" />
                            </div>
                            <h3>Team Leader</h3>
                            <ul>
                                <li>Manage a Team of Employees</li>
                                <li>Assign Tasks to Team Members</li>
                                <li>Track Task Execution</li>
                                <li>Report Progress to Manager</li>
                                <li>Manage Schedules</li>
                            </ul>
                            <div className="card-footer">
                                <a href="#team-lead" className="learn-more">
                                    Learn more <ChevronRight size={16} />
                                </a>
                            </div>
                        </div>

                        <div className="role-card employee">
                            <div className="role-icon">
                                <Users className="icon" />
                            </div>
                            <h3>Employee</h3>
                            <ul>
                                <li>View personal tasks</li>
                                <li>Update task status</li>
                                <li>Add notes to tasks</li>
                                <li>Mark tasks as "complete"</li>
                                <li>Track schedules</li>
                            </ul>
                            <div className="card-footer">
                                <a href="#employee" className="learn-more">
                                    Learn more <ChevronRight size={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="key-features">
                    <h2>Key Capabilities</h2>

                    <div className="features-grid">
                        <div className="feature">
                            <div className="feature-icon">
                                <ClipboardList className="icon" />
                            </div>
                            <h3>Project Management</h3>
                            <p>Create, update, and track multiple projects simultaneously</p>
                        </div>

                        <div className="feature">
                            <div className="feature-icon">
                                <CheckSquare className="icon" />
                            </div>
                            <h3>Task Management</h3>
                            <p>Assign tasks to employees with due dates and tracking status</p>
                        </div>

                        <div className="feature">
                            <div className="feature-icon">
                                <Users className="icon" />
                            </div>
                            <h3>Team Management</h3>
                            <p>Create a hierarchical organizational structure with a manager, team leaders, and employees</p>
                        </div>

                        <div className="feature">
                            <div className="feature-icon">
                                <LayoutDashboard className="icon" />
                            </div>
                            <h3>Custom Dashboard</h3>
                            <p>Customized view for each role with the most relevant information</p>
                        </div>

                        <div className="feature">
                            <div className="feature-icon">
                                <Bell className="icon" />
                            </div>
                            <h3>Alerts and Notifications</h3>
                            <p>Receive notifications about tasks that need to be done and tasks that have not been completed on time</p>
                        </div>

                        <div className="feature">
                            <div className="feature-icon">
                                <BarChart3 className="icon" />
                            </div>
                            <h3>Reports and Analysis</h3>
                            <p>Produce detailed reports on project progress and team performance</p>
                        </div>
                    </div>
                </section>

                <section className="dashboard-preview">
                    <div className="preview-content">
                        <h2>Smart and intuitive dashboard</h2>
                        <p>
                            The system offers a customized dashboard for each user type according to the hierarchical structure. The manager sees the full picture, team leaders receive information about
                            their team, and employees focus on their personal tasks.
                        </p>
                        <ul className="dashboard-features">
                            <li>Customized view by role in the hierarchical structure</li>
                            <li>Real-time tracking of tasks and projects</li>
                            <li>Graphs and progress visualization</li>
                            <li>Notifications about tasks with an approaching deadline</li>
                            <li>Quick filtering and search option</li>
                        </ul>
                    </div>
                    <div className="preview-image">
                        <img
                            src={PicSmartAndIntuitiveDashboard}
                            width={600}
                            height={500}
                            alt="Dashboard"
                            className="dashboard-img"
                        />
                    </div>
                </section>

                <section className="auth-section">
                    <div className="auth-image">
                        <img
                            src={PicEasyAndSecureLogin}
                            width={600}
                            height={500}
                            alt="Dashboard"
                            className="dashboard-img"
                        />
                    </div>
                    <div className="auth-content">
                        <h2>Easy and secure login</h2>
                        <p>
                            The registration and login process is simple and friendly. The administrator registers first and can invite team leaders and employees. Each user
                            logs in using an ID card for the first time and can choose a personal password later.
                        </p>
                        <ul className="auth-features">
                            <li>Login using an ID card for the first time</li>
                            <li>Option to choose a personal password</li>
                            <li>Adjusted permissions for each type of user in the hierarchical structure</li>
                            <li>Advanced security to protect sensitive information</li>
                        </ul>
                    </div>
                </section>

                <section className="workflow-section">
                    <h2>Simple and efficient hierarchical workflow</h2>

                    <div className="workflow-steps">
                        <div className="workflow-step">
                            <div className="step-number">1</div>
                            <h3>Registering and configuring the system</h3>
                            <p>The administrator registers and configures the hierarchical structure of the organization, invites team leaders and employees</p>
                        </div>

                        <div className="workflow-step">
                            <div className="step-number">2</div>
                            <h3>Creating Projects</h3>
                            <p>Manager defines new projects with description, due dates, and goals</p>
                        </div>

                        <div className="workflow-step">
                            <div className="step-number">3</div>
                            <h3>Assign tasks</h3>
                            <p>Team leaders assign tasks to employees on their teams</p>
                        </div>

                        <div className="workflow-step">
                            <div className="step-number">4</div>
                            <h3>Execution and monitoring</h3>
                            <p>Employees perform tasks and update status, managers monitor progress</p>
                        </div>

                        <div className="workflow-step">
                            <div className="step-number">5</div>
                            <h3>Reporting and learning lessons</h3>
                            <p>Produce reports and analyze performance to improve future work processes</p>
                        </div>
                    </div>
                </section>

                <section className="cta-section">
                    <h2>Ready to streamline task management in your organization?</h2>
                    <p>Join hundreds of organizations already using our system for efficient task and project management in a hierarchical structure</p>
                    <button className="cta-btn large">Contact us</button>
                </section>
            </main>

            <footer>
                <div className="footer-content">
                    <div className="footer-logo">
                        <h3>Hierarchical Task Management System</h3>
                        <p>The perfect solution for managing tasks and projects in an organization with a hierarchical structure</p>
                    </div>

                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>More information</h4>
                            <ul>
                                <li>
                                    <a href="#about">About</a>
                                </li>
                                <li>
                                    <a href="#features">Features</a>
                                </li>
                                <li>
                                    <a href="#pricing">Pricing</a>
                                </li>
                                <li>
                                    <a href="#contact">Contact us</a>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4>Resources</h4>
                            <ul>
                                <li>
                                    <a href="#docs">Documentation</a>
                                </li>
                                <li>
                                    <a href="#tutorials">Tutorials</a>
                                </li>
                                <li>
                                    <a href="#support">Support</a>
                                </li>
                                <li>
                                    <a href="#faq">Frequently Asked Questions</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} All rights reserved to Hierarchical Task Management System</p>
                </div>
            </footer>

            <SignIn
                open={openSignInDialog}
                onClose={handleCloseSignInDialog}
                onSuccess={handleSuccessfulSignIn}
            />
            <SignUp
                open={openSignUpDialog}
                onClose={handleCloseSignUpDialog}
                onSuccess={handleSuccessfulSignUp}
            />
        </div>
    )
}
export default LandingPage