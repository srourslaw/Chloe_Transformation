import { useState } from 'react';
import { User, Mail, Clock, CheckCircle, AlertCircle, Users } from 'lucide-react';
import { clsx } from 'clsx';
import Card from '../ui/Card';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'hired' | 'interviewing' | 'offer_made' | 'sourcing' | 'not_started';
  email: string;
  experience: string;
  skills: string[];
  reports: string[];
}

interface Department {
  head: TeamMember;
  members: TeamMember[];
}

interface OrganizationalChartProps {
  ceo: TeamMember;
  departments: Department[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'hired':
      return 'border-success-300 bg-success-50';
    case 'interviewing':
      return 'border-warning-300 bg-warning-50';
    case 'offer_made':
      return 'border-primary-300 bg-primary-50';
    case 'sourcing':
      return 'border-secondary-300 bg-secondary-50';
    default:
      return 'border-secondary-300 bg-secondary-50';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'hired':
      return <CheckCircle className="h-4 w-4 text-success-600" />;
    case 'interviewing':
      return <Clock className="h-4 w-4 text-warning-600" />;
    case 'offer_made':
      return <AlertCircle className="h-4 w-4 text-primary-600" />;
    default:
      return <Users className="h-4 w-4 text-secondary-600" />;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'hired':
      return 'Hired';
    case 'interviewing':
      return 'Interviewing';
    case 'offer_made':
      return 'Offer Made';
    case 'sourcing':
      return 'Sourcing';
    default:
      return 'Not Started';
  }
};

const getDepartmentColor = (department: string) => {
  switch (department) {
    case 'Product':
      return 'bg-purple-500';
    case 'Engineering':
      return 'bg-blue-500';
    case 'Sales':
      return 'bg-green-500';
    case 'Operations':
      return 'bg-orange-500';
    default:
      return 'bg-secondary-500';
  }
};

export default function OrganizationalChart({ ceo, departments }: OrganizationalChartProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const allMembers = [
    ceo,
    ...departments.map(dept => dept.head),
    ...departments.flatMap(dept => dept.members)
  ];

  const totalHired = allMembers.filter(member => member.status === 'hired').length;
  const totalInProgress = allMembers.filter(member =>
    ['interviewing', 'offer_made', 'sourcing'].includes(member.status)
  ).length;

  const TeamMemberCard = ({ member, isHead = false, isCEO = false }: {
    member: TeamMember;
    isHead?: boolean;
    isCEO?: boolean;
  }) => (
    <div
      className={clsx(
        'relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-lg',
        getStatusColor(member.status),
        selectedMember?.id === member.id ? 'ring-2 ring-primary-500 shadow-lg transform scale-105' : '',
        isCEO ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white border-primary-500' :
        isHead ? 'border-l-4' : ''
      )}
      style={isHead && !isCEO ? { borderLeftColor: getDepartmentColor(member.department).replace('bg-', '#') } : {}}
      onClick={() => setSelectedMember(member)}
    >
      <div className="flex items-center gap-3">
        <div className={clsx(
          'w-12 h-12 rounded-full flex items-center justify-center',
          isCEO ? 'bg-white bg-opacity-20' : 'bg-white'
        )}>
          <User className={clsx('h-6 w-6', isCEO ? 'text-white' : 'text-secondary-600')} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={clsx(
            'font-semibold truncate',
            isCEO ? 'text-white' : 'text-secondary-900'
          )}>
            {member.name}
          </h4>
          <p className={clsx(
            'text-sm truncate',
            isCEO ? 'text-primary-100' : 'text-secondary-600'
          )}>
            {member.role}
          </p>
          <div className="flex items-center gap-2 mt-1">
            {getStatusIcon(member.status)}
            <span className={clsx(
              'text-xs',
              isCEO ? 'text-primary-100' : 'text-secondary-500'
            )}>
              {getStatusText(member.status)}
            </span>
          </div>
        </div>
      </div>

      {/* Department indicator for non-CEO */}
      {!isCEO && (
        <div className="absolute top-2 right-2">
          <div
            className={clsx('w-3 h-3 rounded-full', getDepartmentColor(member.department))}
            title={member.department}
          />
        </div>
      )}
    </div>
  );

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
          Interactive Organizational Chart
        </h2>
        <p className="text-sm text-secondary-600">
          Click on team members to view detailed information and hiring status
        </p>
      </div>

      {/* Overall Stats */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-success-50 rounded-lg border border-success-200">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="h-5 w-5 text-success-600" />
            <span className="font-medium text-success-900">Team Members Hired</span>
          </div>
          <div className="text-2xl font-bold text-success-900">{totalHired}</div>
          <div className="text-sm text-success-700">out of {allMembers.length} positions</div>
        </div>

        <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-5 w-5 text-warning-600" />
            <span className="font-medium text-warning-900">In Hiring Process</span>
          </div>
          <div className="text-2xl font-bold text-warning-900">{totalInProgress}</div>
          <div className="text-sm text-warning-700">various stages</div>
        </div>

        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-5 w-5 text-primary-600" />
            <span className="font-medium text-primary-900">Departments</span>
          </div>
          <div className="text-2xl font-bold text-primary-900">{departments.length}</div>
          <div className="text-sm text-primary-700">functional areas</div>
        </div>
      </div>

      {/* Organizational Chart */}
      <div className="space-y-8">
        {/* CEO Level */}
        <div className="flex justify-center">
          <div className="w-80">
            <TeamMemberCard member={ceo} isCEO={true} />
          </div>
        </div>

        {/* Department Heads */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept) => (
            <div key={dept.head.id} className="space-y-4">
              {/* Department Head */}
              <TeamMemberCard member={dept.head} isHead={true} />

              {/* Department Members */}
              <div className="ml-4 space-y-3">
                {dept.members.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Member Details */}
      {selectedMember && (
        <div className="mt-8 p-6 bg-primary-50 rounded-lg border border-primary-200">
          <h3 className="font-semibold text-primary-900 mb-4">
            {selectedMember.name} - {selectedMember.role}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-primary-800 mb-3">Contact Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary-600" />
                  <span className="text-primary-700">{selectedMember.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary-600" />
                  <span className="text-primary-700">Experience: {selectedMember.experience}</span>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(selectedMember.status)}
                  <span className="text-primary-700">Status: {getStatusText(selectedMember.status)}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-primary-800 mb-3">Skills & Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {selectedMember.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {selectedMember.reports.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-primary-800 mb-2">Direct Reports</h4>
                  <div className="text-sm text-primary-700">
                    {selectedMember.reports.length} team member(s)
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Department Legend */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {departments.map((dept) => (
          <div key={dept.head.department} className="flex items-center gap-2">
            <div className={clsx('w-4 h-4 rounded-full', getDepartmentColor(dept.head.department))} />
            <span className="text-sm font-medium text-secondary-700">{dept.head.department}</span>
            <span className="text-xs text-secondary-500">
              ({dept.members.filter(m => m.status === 'hired').length + (dept.head.status === 'hired' ? 1 : 0)}/
              {dept.members.length + 1})
            </span>
          </div>
        ))}
      </div>

      {!selectedMember && (
        <div className="mt-6 text-center py-4 text-secondary-600">
          <p className="text-sm">Click on any team member to view detailed information</p>
        </div>
      )}
    </Card>
  );
}