'use client'

import { useState, useEffect } from 'react'
import { X, User, LogOut, Save, Upload, Camera } from 'lucide-react'

interface ProfileModalProps {
  onClose: () => void
  currentUser?: {
    name: string
    email: string
    bio?: string
    avatar?: string
  }
  onLogout?: () => void        // Made optional
  onProfileUpdate?: (profile: any) => void  // Made optional
}

export default function ProfileModal({ 
  onClose, 
  currentUser, 
  onLogout, 
  onProfileUpdate 
}: ProfileModalProps) {
  const [profile, setProfile] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    bio: currentUser?.bio || '',
    avatar: currentUser?.avatar || ''
  })

  const [isUploading, setIsUploading] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  // Update profile when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setProfile({
        name: currentUser.name || '',
        email: currentUser.email || '',
        bio: currentUser.bio || '',
        avatar: currentUser.avatar || ''
      })
    }
  }, [currentUser])

  // Track changes
  useEffect(() => {
    if (currentUser) {
      const hasProfileChanges = 
        profile.name !== (currentUser.name || '') ||
        profile.email !== (currentUser.email || '') ||
        profile.bio !== (currentUser.bio || '') ||
        profile.avatar !== (currentUser.avatar || '')
      
      setHasChanges(hasProfileChanges)
    }
  }, [profile, currentUser])

  const handleSave = async () => {
    try {
      // Call the parent component's update function
      if (onProfileUpdate) {
        await onProfileUpdate(profile)
      }
      
      // Show success message (you can implement toast notifications)
      console.log('Profile updated successfully')
      
      // Close modal after successful save
      onClose()
    } catch (error) {
      console.error('Failed to update profile:', error)
      // Handle error (show error message to user)
    }
  }

  const handleProfileChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      alert('File size must be less than 2MB')
      return
    }

    setIsUploading(true)

    try {
      // Convert to base64 for preview (in a real app, you'd upload to a server)
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64 = e.target?.result as string
        handleProfileChange('avatar', base64)
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Failed to upload avatar:', error)
      setIsUploading(false)
    }
  }

  const handleLogout = () => {
    // Confirm logout
    if (window.confirm('Are you sure you want to log out?')) {
      if (onLogout) {
        onLogout()
      }
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl mx-4 bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-red-500/20 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-red-500/20">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <User className="w-6 h-6 mr-3 text-red-400" />
            Profile Settings
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-red-500/10 transition-colors text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Profile Information</h3>
              
              {/* Avatar Section */}
              <div className="flex items-center space-x-6 mb-6">
                <div className="relative">
                  {profile.avatar ? (
                    <img 
                      src={profile.avatar} 
                      alt="Profile Avatar" 
                      className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl flex items-center justify-center shadow-lg">
                      <User className="w-10 h-10 text-white" />
                    </div>
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                <div>
                  <label className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors border border-red-500/30 cursor-pointer inline-flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>{isUploading ? 'Uploading...' : 'Change Avatar'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 2MB</p>
                </div>
              </div>

              {/* Profile Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-red-500/20 rounded-xl text-white placeholder-gray-500 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-red-500/20 rounded-xl text-white placeholder-gray-500 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => handleProfileChange('bio', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-red-500/20 rounded-xl text-white placeholder-gray-500 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>
            </div>

            {/* Logout Section */}
            <div className="pt-4 border-t border-red-500/20">
              <div className="p-4 bg-red-900/20 rounded-xl border border-red-500/20">
                <h4 className="text-red-400 font-medium mb-2 flex items-center">
                  <LogOut className="w-4 h-4 mr-2" />
                  Account Actions
                </h4>
                <p className="text-gray-400 text-sm mb-4">Sign out from your account</p>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-red-500/20">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className={`px-6 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              hasChanges 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  )
}