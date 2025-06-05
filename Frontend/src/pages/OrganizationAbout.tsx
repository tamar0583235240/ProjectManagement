import React from 'react';
import { Building2, MapPin, Phone, Users, Target, Award, Calendar, Shield, UserCheck, Eye } from 'lucide-react';
import { useGetOrganizationByUserIdQuery } from '../features/organizations/organizationsApi';
import useCurrentUser from '../hooks/useCurrentUser';

const OrganizationAbout = () => {
  const user = useCurrentUser();
  const organization = useGetOrganizationByUserIdQuery(user._id);

  const roleCards = [
    {
      title: "Manager",
      icon: Shield,
      color: "bg-cyan-500",
      features: [
        "Comprehensive project management",
        "Add team leaders",
        "Assign tasks to projects",
        "Full progress tracking",
        "Generate performance reports",
      ],
    },
    {
      title: "Team Leader",
      icon: UserCheck,
      color: "bg-orange-500",
      features: [
        "Manage team members",
        "Assign tasks to team",
        "Track task execution",
        "Report progress to manager",
        "Manage schedules",
      ],
    },
    {
      title: "Employee",
      icon: Eye,
      color: "bg-yellow-500",
      features: [
        "View personal tasks",
        "Update task status",
        "Add task notes",
        "Mark tasks as complete",
        "Track schedules",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="ltr">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Building2 className="w-8 h-8 text-gray-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              {organization.organization_name}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {organization.organization_description}
            </p>
          </div>
        </div>
      </div>

      {/* Role Cards Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Designed for Every Role</h2>
          <p className="text-gray-600">
            A flexible system that provides custom permissions for each user
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {roleCards.map((role, index) => {
            const IconComponent = role.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-200"
              >
                <div className={`h-2 ${role.color} rounded-t-xl`}></div>
                <div className="p-6">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 ${role.color} rounded-full mb-4`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{role.title}</h3>
                  <ul className="space-y-2">
                    {role.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-gray-600 text-sm"
                      >
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full ml-2 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-4 text-cyan-500 text-sm font-medium hover:text-cyan-600">
                    Learn More →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
            <p className="text-lg text-gray-600 mb-8">
              We’re ready to hear from you and help you achieve your goals. Get in touch today!
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 bg-cyan-500 rounded-full">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Address</h4>
                  <p className="text-gray-600">{organization.organization_address}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 bg-orange-500 rounded-full">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Phone</h4>
                  <p className="text-gray-600">{organization.organization_phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Placeholder or image can go here */}
          <div className="h-64 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
            {/* Image or Map Placeholder */}
            Image or Map Placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationAbout;
