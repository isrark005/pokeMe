import { useEffect, useState } from "react";
import { Container } from "./Container";

export function ReminderList() {
  const [reminderList, setReminderList] = useState<any>(null);
  const reminderListObj = reminderList && Object.values(reminderList);
  useEffect(() => {
    chrome.storage.local.get(null, (data) => setReminderList(data));
  }, []);

  console.log(reminderList);

  return (
    <Container>
      <ul>
        {reminderListObj &&
          reminderListObj.length > 0 &&
          reminderListObj.map((data: any) => <a href={data.url}>{data.title}</a>)}
      </ul>
    </Container>
  );
}
