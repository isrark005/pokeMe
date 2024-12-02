import { useEffect, useState } from "react";
import { Container } from "./Container";
import { ExternalLink } from "../assets/icons/ExternalLink";
import { ClockIcon } from "../assets/icons/ClockIcon";
import { Trashicon } from "../assets/icons/Trashicon";

export type ReminderT = {
  title: string,
  id: string,
  link: string,
  reminderDate: string  
}

interface ReminderListProps {
  handleFoundItemcallBack: (item: ReminderT) => void
}

export function ReminderList({ handleFoundItemcallBack }: ReminderListProps) {
  const [reminderList, setReminderList] = useState<any>(null);
  const [reminderListObj, setReminderListObj] = useState<ReminderT[]>([]);
  
  useEffect(() => {
    chrome.storage.local.get(null, (data) => setReminderList(data));
  }, []);

  const openLink = (link: string) => {
    if (link) chrome.tabs.create({ url: link });
  };
  
  const handleChangeTime = (id: string) => {
    const foundItem = reminderList[id];
    if (foundItem) {
      handleFoundItemcallBack(foundItem);
    }
  };
  
  const handleDelete = (id: string) => {
    chrome.storage.local.remove(id);
    chrome.alarms.clear(id);
    const filteredReminder = reminderListObj.filter((rem) => rem.id !== id);
    setReminderListObj(filteredReminder);
  };
  
  const formatDate = (datetime: string) => {
    const date = new Date(datetime);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatTime = (datetime: string) => {
    const date = new Date(datetime);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    if (reminderList) {
      setReminderListObj(Object.values(reminderList));
    }
  }, [reminderList]);

  // Separate upcoming and previous reminders based on the current time
  const currentTime = new Date().getTime();
  const upcomingReminders = reminderListObj.filter(rem => new Date(rem.reminderDate).getTime() > currentTime);
  const previousReminders = reminderListObj.filter(rem => new Date(rem.reminderDate).getTime() <= currentTime);

  return (
    <Container className="bg-gray-100 py-4">
      <>
        <h2 className="mb-3 text-[24px] font-bold text-secondary">Upcoming Reminders</h2>
        <ul className="space-y-3">
          {upcomingReminders.length > 0 ? (
            upcomingReminders.map((reminder) => (
              <li key={reminder.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="py-3 px-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">{reminder.title}</h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <ClockIcon className="mr-1 size-4" />
                        <span>{formatDate(reminder.reminderDate)}</span>
                        <span className="mx-2">•</span>
                        <span>{formatTime(reminder.reminderDate)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => openLink(reminder.link)} className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors" aria-label="Open link">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleChangeTime(reminder.id)} className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors" aria-label="Change reminder time">
                      <ClockIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(reminder.id)} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors" aria-label="Delete reminder">
                      <Trashicon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <div>No Upcoming Reminders</div>
          )}
        </ul>

        <h2 className="mt-8 mb-3 text-[24px] font-bold text-secondary">Previous Reminders</h2>
        <ul className="space-y-3">
          {previousReminders.length > 0 ? (
            previousReminders.map((reminder) => (
              <li key={reminder.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="py-3 px-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">{reminder.title}</h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <ClockIcon className="mr-1 size-4" />
                        <span>{formatDate(reminder.reminderDate)}</span>
                        <span className="mx-2">•</span>
                        <span>{formatTime(reminder.reminderDate)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => openLink(reminder.link)} className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors" aria-label="Open link">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(reminder.id)} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors" aria-label="Delete reminder">
                      <Trashicon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <div>No Previous Reminders</div>
          )}
        </ul>
      </>
    </Container>
  );
}
