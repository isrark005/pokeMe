import { useEffect, useState } from "react";
import { Container } from "./Container";
import { ExternalLink } from "../assets/icons/ExternalLink";
import { ClockIcon } from "../assets/icons/ClockIcon";
import { Trashicon } from "../assets/icons/Trashicon";

export function ReminderList() {
  const [reminderList, setReminderList] = useState<any>(null);
  const reminderListObj = reminderList && Object.values(reminderList);
  useEffect(() => {
    chrome.storage.local.get(null, (data) => setReminderList(data));
  }, []);

  console.log(reminderList);
  const handleChangeTime = (id: string) => {
    console.log("handle the time change", id);
  };
  const handleDelete = (id: string) => {
    console.log("handle delete", id);
  };
  console.log(reminderListObj);
  
  const formatDate = (datetime: string) => {
    const date = new Date(datetime)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const formatTime = (datetime: string) => {
    const date = new Date(datetime)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  
  return (
    <Container className="bg-gray-100">
      <>      
      <h2 className="mt-6 mb-3 text-[24px] font-bold text-secondary">
          All Reminders
        </h2>
      <ul className="space-y-3">
        {reminderListObj ? (
          reminderListObj.map((reminder: any) => (
            <li
              key={reminder.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="py-3 px-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {reminder.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <ClockIcon className="mr-1 w-2 h-2" />
                      <span>{formatDate(reminder.reminderDate)}</span>
                      <span className="mx-2">•</span>
                      <span>{formatTime(reminder.reminderDate)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <a
                    href={reminder.link}
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                    aria-label="Open link"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => handleChangeTime(reminder.id)}
                    className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors"
                    aria-label="Change reminder time"
                  >
                    <ClockIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(reminder.id)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    aria-label="Delete reminder"
                  >
                    <Trashicon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <div>No Reminder Added</div>
        )}
      </ul>
      </>

    </Container>
  );
}
