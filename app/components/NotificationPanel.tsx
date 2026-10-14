'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { notifysocket } from '../socket/nofiysocket';
import { soundFX } from './SoundEffects';

// ─── Types ────────────────────────────────────────────────────────────────
interface Notification {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────
const BellIcon: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const CloseIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const TrashIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const CheckAllIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 12 5 16 9 12" />
    <polyline points="9 12 13 16 22 6" />
  </svg>
);

const UserIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailOpenIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
    <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
  </svg>
);

// ─── Helpers ──────────────────────────────────────────────────────────────
function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);

  if (diff < 10) return 'just now';
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function generateId(): string {
  return `notif-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// ─── Toast Component ──────────────────────────────────────────────────────
const NotificationToast: React.FC<{
  notification: Notification;
  onDismiss: (id: string) => void;
  onOpen: () => void;
}> = ({ notification, onDismiss, onOpen }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onDismiss(notification.id), 400);
    }, 6000);
    return () => clearTimeout(timer);
  }, [notification.id, onDismiss]);

  return (
    <div
      className={`notification-toast ${isExiting ? 'notification-toast-exit' : 'notification-toast-enter'}`}
      onClick={onOpen}
      role="alert"
    >
      {/* Glowing top accent bar */}
      <div className="notification-toast-accent" />

      <div className="notification-toast-body">
        {/* Avatar */}
        <div className="notification-toast-avatar">
          {getInitials(notification.name)}
        </div>

        {/* Content */}
        <div className="notification-toast-content">
          <div className="notification-toast-header">
            <span className="notification-toast-name">{notification.name}</span>
            <span className="notification-toast-time">{timeAgo(notification.createdAt)}</span>
          </div>
          <p className="notification-toast-subject">{notification.subject || 'New message'}</p>
          <p className="notification-toast-message">{notification.message}</p>
        </div>

        {/* Dismiss */}
        <button
          className="notification-toast-dismiss"
          onClick={(e) => {
            e.stopPropagation();
            setIsExiting(true);
            setTimeout(() => onDismiss(notification.id), 400);
          }}
          aria-label="Dismiss notification"
        >
          <CloseIcon size={14} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="notification-toast-progress" />
    </div>
  );
};

// ─── Notification Card (inside panel) ─────────────────────────────────────
const NotificationCard: React.FC<{
  notification: Notification;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ notification, onMarkRead, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`notification-card ${notification.read ? 'notification-card-read' : 'notification-card-unread'}`}
      onClick={() => {
        setExpanded(!expanded);
        if (!notification.read) onMarkRead(notification.id);
      }}
    >
      {/* Unread indicator dot */}
      {!notification.read && <div className="notification-card-dot" />}

      <div className="notification-card-top">
        {/* Avatar */}
        <div className={`notification-card-avatar ${notification.read ? 'notification-card-avatar-read' : ''}`}>
          {getInitials(notification.name)}
        </div>

        {/* Info */}
        <div className="notification-card-info">
          <div className="notification-card-name-row">
            <span className="notification-card-name">{notification.name}</span>
            <span className="notification-card-time">{timeAgo(notification.createdAt)}</span>
          </div>
          <p className="notification-card-email">
            <MailOpenIcon size={12} />
            {notification.email}
          </p>
          <p className="notification-card-subject">{notification.subject || 'No subject'}</p>
        </div>
      </div>

      {/* Expanded message */}
      {expanded && (
        <div className="notification-card-expanded">
          <p className="notification-card-message">{notification.message}</p>
          <div className="notification-card-actions">
            <a
              href={`mailto:${notification.email}?subject=Re: ${notification.subject}`}
              className="notification-card-reply"
              onClick={(e) => e.stopPropagation()}
            >
              ↩ Reply via Email
            </a>
            <button
              className="notification-card-delete"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(notification.id);
              }}
            >
              <TrashIcon size={13} />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Main NotificationPanel Component ─────────────────────────────────────
export const NotificationPanel: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [toasts, setToasts] = useState<Notification[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close panel on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setPanelOpen(false);
      }
    };
    if (panelOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [panelOpen]);

  // Socket connection & listen for new-contact events
  useEffect(() => {
    notifysocket.connect();

    notifysocket.on('connect', () => {
      notifysocket.emit('company-join');
    });

    const handleNewContact = (data: {
      name: string;
      email: string;
      subject: string;
      message: string;
      createdAt: string;
    }) => {
      const newNotif: Notification = {
        id: generateId(),
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        createdAt: data.createdAt,
        read: false,
      };

      setNotifications((prev) => [newNotif, ...prev]);
      setToasts((prev) => [newNotif, ...prev]);

      try {
        soundFX.playPowerUp();
      } catch {
        // Sound not available
      }
    };

    notifysocket.on('new-contact', handleNewContact);

    return () => {
      notifysocket.off('new-contact', handleNewContact);
      notifysocket.off('connect');
      notifysocket.disconnect();
    };
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const markRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    soundFX.playPop();
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    soundFX.playPop();
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
    soundFX.playPop();
  }, []);

  return (
    <>
      {/* ── Floating Bell Button ──────────────────────────────── */}
      <button
        id="notification-bell"
        className="notification-bell"
        onClick={() => {
          soundFX.playBoop();
          setPanelOpen(!panelOpen);
        }}
        aria-label="Notifications"
      >
        <div className={`notification-bell-icon ${unreadCount > 0 ? 'notification-bell-active' : ''}`}>
          <BellIcon size={22} />
        </div>

        {/* Unread badge */}
        {unreadCount > 0 && (
          <span className="notification-bell-badge">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}

        {/* Ping ring for unread */}
        {unreadCount > 0 && <span className="notification-bell-ping" />}
      </button>

      {/* ── Toast Stack ───────────────────────────────────────── */}
      <div className="notification-toast-stack">
        {toasts.slice(0, 3).map((notif) => (
          <NotificationToast
            key={notif.id}
            notification={notif}
            onDismiss={dismissToast}
            onOpen={() => {
              setPanelOpen(true);
              dismissToast(notif.id);
            }}
          />
        ))}
      </div>

      {/* ── Slide-in Panel ────────────────────────────────────── */}
      {panelOpen && <div className="notification-overlay" />}
      <div
        ref={panelRef}
        className={`notification-panel ${panelOpen ? 'notification-panel-open' : ''}`}
      >
        {/* Panel Header */}
        <div className="notification-panel-header">
          <div className="notification-panel-title-row">
            <div className="notification-panel-title">
              <span className="notification-panel-icon">🔔</span>
              <h3>Notifications</h3>
              {unreadCount > 0 && (
                <span className="notification-panel-count">{unreadCount}</span>
              )}
            </div>
            <button
              className="notification-panel-close"
              onClick={() => setPanelOpen(false)}
              aria-label="Close notifications"
            >
              <CloseIcon size={18} />
            </button>
          </div>

          {/* Action buttons */}
          {notifications.length > 0 && (
            <div className="notification-panel-actions">
              <button
                className="notification-panel-action-btn"
                onClick={markAllRead}
                disabled={unreadCount === 0}
              >
                <CheckAllIcon size={14} />
                Mark all read
              </button>
              <button
                className="notification-panel-action-btn notification-panel-action-danger"
                onClick={clearAll}
              >
                <TrashIcon size={14} />
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Panel Body */}
        <div className="notification-panel-body">
          {notifications.length === 0 ? (
            <div className="notification-panel-empty">
              <div className="notification-panel-empty-icon">
                <BellIcon size={40} />
              </div>
              <p className="notification-panel-empty-title">All clear!</p>
              <p className="notification-panel-empty-desc">
                No notifications yet. When someone sends a message through the contact form, it will appear here in real-time.
              </p>
            </div>
          ) : (
            <div className="notification-panel-list">
              {notifications.map((notif) => (
                <NotificationCard
                  key={notif.id}
                  notification={notif}
                  onMarkRead={markRead}
                  onDelete={deleteNotification}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
