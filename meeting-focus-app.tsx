import React, { useState, useEffect } from 'react';
import { Calendar, Phone, MessageSquare, Video, Clock, Settings, Shield, Bell, BellOff } from 'lucide-react';

const MeetingFocusApp = () => {
  const [currentMode, setCurrentMode] = useState('normal');
  const [meetings, setMeetings] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [autoReplyMessage, setAutoReplyMessage] = useState("I'm currently in a meeting. Will get back to you soon!");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const focusModes = {
    normal: {
      name: 'Normal Mode',
      icon: Bell,
      color: 'bg-green-500',
      description: 'All notifications enabled'
    },
    meeting: {
      name: 'Meeting Mode',
      icon: Video,
      color: 'bg-red-500',
      description: 'Block all except emergency calls'
    },
    interview: {
      name: 'Interview Mode',
      icon: Shield,
      color: 'bg-purple-500',
      description: 'Complete silence mode'
    },
    focus: {
      name: 'Focus Mode',
      icon: BellOff,
      color: 'bg-blue-500',
      description: 'Work focus with minimal distractions'
    }
  };

  const addMeeting = (title, startTime, duration, mode) => {
    const newMeeting = {
      id: Date.now(),
      title,
      startTime: new Date(startTime),
      duration: parseInt(duration),
      mode,
      active: false
    };
    setMeetings([...meetings, newMeeting]);
  };

  const toggleMeeting = (id) => {
    setMeetings(meetings.map(meeting => 
      meeting.id === id ? { ...meeting, active: !meeting.active } : meeting
    ));
  };

  const deleteMeeting = (id) => {
    setMeetings(meetings.filter(meeting => meeting.id !== id));
  };

  const getCurrentActiveMeeting = () => {
    return meetings.find(meeting => {
      const now = new Date();
      const endTime = new Date(meeting.startTime.getTime() + meeting.duration * 60000);
      return meeting.active && now >= meeting.startTime && now <= endTime;
    });
  };

  const activeMeeting = getCurrentActiveMeeting();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <Shield className="text-blue-600" />
              Meeting Focus Assistant
            </h1>
            <div className="text-right">
              <div className="text-2xl font-mono text-gray-700">
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="text-sm text-gray-500">
                {currentTime.toLocaleDateString()}
              </div>
            </div>
          </div>

          {activeMeeting && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
              <div className="flex items-center gap-2">
                <Video className="text-red-500" />
                <span className="font-semibold text-red-700">
                  Currently in: {activeMeeting.title}
                </span>
                <span className="ml-auto text-sm text-red-600">
                  {focusModes[activeMeeting.mode].name} Active
                </span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {Object.entries(focusModes).map(([key, mode]) => {
              const IconComponent = mode.icon;
              const isActive = currentMode === key || (activeMeeting && activeMeeting.mode === key);
              
              return (
                <button
                  key={key}
                  onClick={() => setCurrentMode(key)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    isActive 
                      ? `${mode.color} text-white border-transparent shadow-lg` 
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-semibold text-sm">{mode.name}</div>
                  <div className="text-xs mt-1 opacity-80">{mode.description}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="text-blue-600" />
              Schedule Meeting
            </h2>
            
            <div className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Meeting title"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              
              <input
                type="datetime-local"
                name="startTime"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              
              <div className="flex gap-2">
                <input
                  type="number"
                  name="duration"
                  placeholder="Duration (minutes)"
                  min="5"
                  max="480"
                  required
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                
                <select
                  name="mode"
                  required
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Object.entries(focusModes).map(([key, mode]) => (
                    <option key={key} value={key}>{mode.name}</option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={() => {
                  const titleInput = document.querySelector('input[name="title"]');
                  const timeInput = document.querySelector('input[name="startTime"]');
                  const durationInput = document.querySelector('input[name="duration"]');
                  const modeSelect = document.querySelector('select[name="mode"]');
                  
                  if (titleInput.value && timeInput.value && durationInput.value && modeSelect.value) {
                    addMeeting(titleInput.value, timeInput.value, durationInput.value, modeSelect.value);
                    titleInput.value = '';
                    timeInput.value = '';
                    durationInput.value = '';
                    modeSelect.value = 'meeting';
                  }
                }}
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Schedule Meeting
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MessageSquare className="text-green-600" />
              Auto-Reply Settings
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auto-reply message for WhatsApp/SMS:
                </label>
                <textarea
                  value={autoReplyMessage}
                  onChange={(e) => setAutoReplyMessage(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Quick Instructions:</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>• Copy the auto-reply message to your messaging apps</div>
                  <div>• Enable Do Not Disturb on your phone</div>
                  <div>• Set emergency contacts as exceptions</div>
                  <div>• Use airplane mode + WiFi for video calls</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="text-purple-600" />
            Scheduled Meetings
          </h2>
          
          {meetings.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No meetings scheduled</p>
          ) : (
            <div className="space-y-3">
              {meetings.map((meeting) => {
                const isActive = meeting.active;
                const isPast = new Date() > new Date(meeting.startTime.getTime() + meeting.duration * 60000);
                const ModeIcon = focusModes[meeting.mode].icon;
                
                return (
                  <div
                    key={meeting.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isActive 
                        ? 'border-red-500 bg-red-50' 
                        : isPast 
                        ? 'border-gray-200 bg-gray-50 opacity-60' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ModeIcon className={`w-5 h-5 ${focusModes[meeting.mode].color.replace('bg-', 'text-')}`} />
                        <div>
                          <div className="font-semibold text-gray-800">{meeting.title}</div>
                          <div className="text-sm text-gray-600">
                            {meeting.startTime.toLocaleString()} • {meeting.duration} min • {focusModes[meeting.mode].name}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {!isPast && (
                          <button
                            onClick={() => toggleMeeting(meeting.id)}
                            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                              isActive
                                ? 'bg-red-600 text-white hover:bg-red-700'
                                : 'bg-green-600 text-white hover:bg-green-700'
                            }`}
                          >
                            {isActive ? 'End' : 'Start'}
                          </button>
                        )}
                        
                        <button
                          onClick={() => deleteMeeting(meeting.id)}
                          className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Settings className="text-gray-600" />
            Device Setup Instructions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Android Setup:</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <div>1. Go to Settings → Sound & vibration → Do not disturb</div>
                <div>2. Set up schedules for your meeting times</div>
                <div>3. Allow exceptions for emergency contacts</div>
                <div>4. Enable "Hide notifications" in meeting apps</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">iPhone Setup:</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <div>1. Settings → Focus → Create new focus</div>
                <div>2. Set automation based on time/app</div>
                <div>3. Allow important contacts only</div>
                <div>4. Use Control Center for quick toggle</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingFocusApp;