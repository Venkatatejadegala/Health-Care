import * as React from 'react';
const { useState, useEffect } = React;
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useAuth } from '../context/AuthContext';

interface UserProfile {
  name: string;
  age: number;
  sex: string;
  height: number;
  weight: number;
  activityLevel: string;
  goal: string;
  bmr?: number;
  tdee?: number;
  calorieTarget?: number;
  proteinTarget?: number;
  carbsTarget?: number;
  fatsTarget?: number;
}

const UserProfilePage: React.FC = () => {
  const { user, token } = useAuth(); // Get user and token from auth context
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: 0,
    sex: '',
    height: 0,
    weight: 0,
    activityLevel: '',
    goal: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !token) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }

    // Fetch user profile if it exists
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/api/profile', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          if (response.status === 404) {
            // Profile not found, so we'll just start with an empty form
            return;
          }
          throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();
        setProfile(data.userProfile);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user, token, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: name === 'age' || name === 'height' || name === 'weight' ? parseFloat(value) : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error('Failed to save user profile');
      }

      const data = await response.json();
      setProfile(data.userProfile); // Update with calculated values from backend
      alert('Profile saved successfully!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile.name) {
    return <div className="flex justify-center items-center min-h-screen">Loading profile...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-bold gradient-text">Profile Settings</h1>
            <p className="text-gray-600 text-lg">Customize your health tracking preferences</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Form */}
        <div className="lg:col-span-2">
          <Card className="card-modern">
            <CardHeader className="">
              <CardTitle className="text-2xl font-bold text-gray-800">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      type="text"
                      value={profile.name} 
                      onChange={handleChange} 
                      required 
                      className="input-field"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-sm font-semibold text-gray-700">Age</Label>
                    <Input 
                      id="age" 
                      name="age" 
                      type="number" 
                      value={profile.age} 
                      onChange={handleChange} 
                      required 
                      className="input-field"
                      placeholder="Enter your age"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sex" className="text-sm font-semibold text-gray-700">Gender</Label>
                  <Select name="sex" value={profile.sex} onValueChange={(value) => handleSelectChange('sex', value)}>
                    <SelectTrigger className="input-field">
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent className={undefined}>
                      <SelectItem value="male" className="">Male</SelectItem>
                      <SelectItem value="female" className="">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="height" className="text-sm font-semibold text-gray-700">Height (cm)</Label>
                    <Input 
                      id="height" 
                      name="height" 
                      type="number" 
                      value={profile.height} 
                      onChange={handleChange} 
                      required 
                      className="input-field"
                      placeholder="Enter your height"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-sm font-semibold text-gray-700">Weight (kg)</Label>
                    <Input 
                      id="weight" 
                      name="weight" 
                      type="number" 
                      value={profile.weight} 
                      onChange={handleChange} 
                      required 
                      className="input-field"
                      placeholder="Enter your weight"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="activityLevel" className="text-sm font-semibold text-gray-700">Activity Level</Label>
                  <Select name="activityLevel" value={profile.activityLevel} onValueChange={(value) => handleSelectChange('activityLevel', value)}>
                    <SelectTrigger className="input-field">
                      <SelectValue placeholder="Select your activity level" />
                    </SelectTrigger>
                    <SelectContent className={undefined}>
                      <SelectItem value="sedentary" className="">Sedentary (little to no exercise)</SelectItem>
                      <SelectItem value="lightly_active" className="">Lightly Active (light exercise 1-3 days/week)</SelectItem>
                      <SelectItem value="moderately_active" className="">Moderately Active (moderate exercise 3-5 days/week)</SelectItem>
                      <SelectItem value="very_active" className="">Very Active (hard exercise 6-7 days/week)</SelectItem>
                      <SelectItem value="super_active" className="">Super Active (very hard exercise, physical job)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="goal" className="text-sm font-semibold text-gray-700">Fitness Goal</Label>
                  <Select name="goal" value={profile.goal} onValueChange={(value) => handleSelectChange('goal', value)}>
                    <SelectTrigger className="input-field">
                      <SelectValue placeholder="Select your fitness goal" />
                    </SelectTrigger>
                    <SelectContent className="">
                      <SelectItem value="bulking" className="">Bulking (gain weight)</SelectItem>
                      <SelectItem value="cutting" className="">Cutting (lose weight)</SelectItem>
                      <SelectItem value="recomposition" className="">Recomposition (maintain weight)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                    <p className="text-red-600 text-sm font-medium">Error: {error}</p>
                  </div>
                )}

                <Button type="submit" className="btn-primary w-full" disabled={loading} variant="default" size="default">
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Saving Profile...
                    </div>
                  ) : (
                    'Save Profile'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Health Stats Sidebar */}
        <div className="space-y-6">
          <Card className="card-modern">
            <CardHeader className="">
              <CardTitle className="text-xl font-bold text-gray-800">Health Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">BMI</p>
                    <p className="text-2xl font-bold text-blue-800">
                      {profile.height && profile.weight ? 
                        (profile.weight / Math.pow(profile.height / 100, 2)).toFixed(1) : '--'}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">BMR</p>
                    <p className="text-2xl font-bold text-green-800">
                      {profile.bmr ? Math.round(profile.bmr) : '--'} cal
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 text-sm font-medium">TDEE</p>
                    <p className="text-2xl font-bold text-purple-800">
                      {profile.tdee ? Math.round(profile.tdee) : '--'} cal
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    </svg>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-modern">
            <CardHeader className="">
              <CardTitle className="text-xl font-bold text-gray-800">Daily Targets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Calories</span>
                <span className="font-semibold text-gray-800">
                  {profile.calorieTarget ? Math.round(profile.calorieTarget) : '--'} cal
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Protein</span>
                <span className="font-semibold text-gray-800">
                  {profile.proteinTarget ? Math.round(profile.proteinTarget) : '--'} g
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Carbs</span>
                <span className="font-semibold text-gray-800">
                  {profile.carbsTarget ? Math.round(profile.carbsTarget) : '--'} g
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Fats</span>
                <span className="font-semibold text-gray-800">
                  {profile.fatsTarget ? Math.round(profile.fatsTarget) : '--'} g
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
