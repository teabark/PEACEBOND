const NOTIFICATIONS_KEY = "peacebond_notifications";

function readNotifications() {
  const storedNotifications = localStorage.getItem(NOTIFICATIONS_KEY);

  if (!storedNotifications) {
    return [];
  }

  try {
    return JSON.parse(storedNotifications);
  } catch {
    return [];
  }
}

export function addNotification({ message, title, type = "info" }) {
  const notification = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
    message,
    title,
    type,
  };
  const notifications = [notification, ...readNotifications()].slice(0, 40);
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
  return notification;
}

export function getNotifications() {
  return readNotifications();
}
