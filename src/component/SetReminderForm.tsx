import { useState, FormEvent, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ReminderT } from "./ReminderList";

interface SetReminderFormProps {
  foundItem: ReminderT | null;
}

export default function SetReminderForm({ foundItem }: SetReminderFormProps) {
  const today = new Date().toISOString().split("T")[0];
  const foundItemDate =
    foundItem && new Date(foundItem?.reminderDate).toISOString().split("T")[0];
  const [link, setLink] = useState(foundItem?.link || "");
  const [date, setDate] = useState(foundItemDate || today);
  const [time, setTime] = useState("");
  const [title, setTitle] = useState(foundItem?.title || "");
  const urlParams = new URLSearchParams(window.location.search);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (foundItem) {
      chrome.storage.local.remove(foundItem.id);
      chrome.alarms.clear(foundItem.id);
    }

    const reminderDate = new Date(`${date}T${time}`);
    const timeDifference = reminderDate.getTime() - Date.now();

    const uniueId = uuidv4();
    if (timeDifference > 0) {
      chrome.alarms.create(uniueId, { when: Date.now() + timeDifference });
      const reqBody = {
        [uniueId]: {
          link,
          title,
          id: uniueId,
          reminderDate: reminderDate.toISOString(),
        },
      };
      console.log(reqBody);
      chrome.storage.local.set(reqBody);
    }
    setLink("");
    setDate("");
    setTime("");
    setTitle("");
  };

  useEffect(() => {
    if (foundItem) {
      setLink(foundItem.link);
      foundItemDate && setDate(foundItemDate);
      setTitle(foundItem.title);
    }
  }, [foundItem]);
  useEffect(() => {
    chrome.storage.local?.get(["reminderTitle", "reminderLink"], (data) => {
      if (data.reminderTitle) {
        setTitle(data.reminderTitle || "");
        setLink(data.reminderLink || "");
        chrome.storage.local.remove(["reminderTitle", "reminderLink"]);
      }
    });

    return () => {
      setTitle("");
      setLink("");
    };
  }, []);

  useEffect(() => {
    const titleParam = urlParams.get("title");
    const linkParam = urlParams.get("link");
    if (titleParam && linkParam) {
      setTitle(titleParam);
      setLink(linkParam);
    } else
      (async () => {
        const [tab] = await chrome.tabs.query({ active: true });
        if (tab) {
          setTitle(tab.title || "");

          setLink(tab.url || "");
        }
      })();
  }, []);

  return (
    <>
      <div className="form-heading px-4">
        <h2 className="mt-6 mb-3 text-[38px] font-bold text-secondary">
          Hold My Spot!
        </h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 pt-0 bg-white rounded-lg shadow"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give a title to this reminder"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="link"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Web Page Link
          </label>
          <input
            type="url"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://example.com"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={today}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Time
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full px-4 transition-all py-2 text-sm font-medium text-white bg-secondary rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Set Reminder
        </button>
      </form>
    </>
  );
}
