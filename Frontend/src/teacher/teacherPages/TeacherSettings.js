import React, { useState } from 'react';
import Sidebar from '../teacherComponents/SideBar';
const Card = ({ children, className }) => (
  <div className={`rounded-lg border bg-white shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className }) => (
  <div className={`border-b p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className }) => (
  <h3 className={`text-xl font-semibold ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className }) => (
  <p className={`text-sm text-gray-500 ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const CardFooter = ({ children, className }) => (
  <div className={`border-t p-6 ${className}`}>
    {children}
  </div>
);

const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === TabsList) {
            return React.cloneElement(child, { activeTab, setActiveTab });
          } else if (child.type === TabsContent) {
            return React.cloneElement(child, { activeTab });
          }
        }
        return child;
      })}
    </div>
  );
}


const TabsList = ({ children, className, activeTab, setActiveTab }) => (
  <div className={`flex gap-1 rounded-md p-1 ${className}`}>
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child)){
        return React.cloneElement(child, { 
          active: child.props.value === activeTab,
          onClick: () => setActiveTab(child.props.value)})

        };
      
      return child;
    })}
  </div>
);

const TabsTrigger = ({ 
  children, 
  value, 
  active, 
  onClick,
  className 
}) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      active ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:bg-gray-100'
    } ${className}`}
  >
    {children}
  </button>
);

const TabsContent = ({ children, value, activeTab }) => (
  <div className={`mt-4 ${value === activeTab ? 'block' : 'hidden'}`}>
    {children}
  </div>
);

const Button = ({ 
  children, 
  className,
  type = 'button',
  onClick 
}) => (
  <button
    type={type}
    onClick={onClick}
    className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 ${className}`}
  >
    {children}
  </button>
);

const Input = ({ 
  id, 
  value, 
  onChange, 
  type = 'text',
  className
}) => (
  <input
    id={id}
    type={type}
    value={value}
    onChange={onChange}
    className={`flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
  />
);

const Label = ({ children, htmlFor, className }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`}>
    {children}
  </label>
);

const Switch = ({ 
  checked, 
  onCheckedChange 
}) => (
  <button
    type="button"
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
      checked ? 'bg-indigo-600' : 'bg-gray-200'
    }`}
    onClick={() => onCheckedChange(!checked)}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        checked ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

// 4. Dashboard Layout (simplified)



// 2. Toast Hook
const useToast = () => {
  return {
    toast: (options) => {
      console.log(`Toast: ${options.title} - ${options.description}`);
    },
  };
};

// 3. UI Components (keep all your existing UI components as they were)

// 4. Dashboard Layout (simplified)
const DashboardLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    {children}
  </div>
);

// 5. Settings Component (without appearance)
const Settings = () => {
  const { toast } = useToast();
  
  // Profile settings
  const [profile, setProfile] = useState({
    name: "Name",
    email: "email@email.com",
    phone: "555-123-4567",
   
   
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    courseUpdates: true,
    dueReminders: true,
    marketingEmails: false,
  });

  // Handle profile form submission
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  // Handle notification toggle
  const handleNotificationToggle = (setting) => {
    setNotifications({
      ...notifications,
      [setting]: !notifications[setting],
    });

    toast({
      title: `${!notifications[setting] ? 'Enabled' : 'Disabled'} ${setting}`,
      description: `${setting} has been ${!notifications[setting] ? 'enabled' : 'disabled'}.`,
    });
  };

  return (
    <DashboardLayout>
       <div className="flex h-screen w-full absolute left-0 top-0">
      <div >
        <Sidebar />
      
     </div>
      <div className="w-full mx-auto p-6  overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        
        <Tabs defaultValue="profile">
          <TabsList className="grid grid-cols-2 w-full bg-blue-100 mb-6">
            <TabsTrigger value="profile" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
              Notifications
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Manage your account details and preferences.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleProfileSubmit}>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) =>
                            setProfile({ ...profile, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) =>
                            setProfile({ ...profile, email: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) =>
                            setProfile({ ...profile, phone: e.target.value })
                          }
                        />
                      </div>
                    
                    </div>
                    
                  
                    
                    
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700">
                    Save Changes
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Control how and when you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center">
                    Communication Channels
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Email Notifications</Label>
                        <p className="text-sm text-gray-500">
                          Receive updates via email
                        </p>
                      </div>
                      <Switch
                        checked={notifications.emailNotifications}
                        onCheckedChange={() => handleNotificationToggle("emailNotifications")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Push Notifications</Label>
                        <p className="text-sm text-gray-500">
                          Receive notifications in-browser
                        </p>
                      </div>
                      <Switch
                        checked={notifications.pushNotifications}
                        onCheckedChange={() => handleNotificationToggle("pushNotifications")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">SMS Notifications</Label>
                        <p className="text-sm text-gray-500">
                          Receive text messages for important updates
                        </p>
                      </div>
                      <Switch
                        checked={notifications.smsNotifications}
                        onCheckedChange={() => handleNotificationToggle("smsNotifications")}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center">
                    Notification Types
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Course Updates</Label>
                        <p className="text-sm text-gray-500">
                          New materials, announcements, and changes to courses
                        </p>
                      </div>
                      <Switch
                        checked={notifications.courseUpdates}
                        onCheckedChange={() => handleNotificationToggle("courseUpdates")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Due Date Reminders</Label>
                        <p className="text-sm text-gray-500">
                          Reminders for upcoming assignments and exams
                        </p>
                      </div>
                      <Switch
                        checked={notifications.dueReminders}
                        onCheckedChange={() => handleNotificationToggle("dueReminders")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Marketing Emails</Label>
                        <p className="text-sm text-gray-500">
                          Promotional content and special offers
                        </p>
                      </div>
                      <Switch
                        checked={notifications.marketingEmails}
                        onCheckedChange={() => handleNotificationToggle("marketingEmails")}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;