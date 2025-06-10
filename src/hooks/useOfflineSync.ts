import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

interface OfflineAction {
  id: string;
  type: 'CREATE' | 'UPDATE' | 'DELETE';
  endpoint: string;
  data: any;
  timestamp: number;
}

export const useOfflineSync = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingActions, setPendingActions] = useState<OfflineAction[]>([]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncPendingActions();
      toast({
        title: "Back online!",
        description: "Syncing your data...",
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "You're offline",
        description: "Changes will be saved locally and synced when you're back online.",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load pending actions from localStorage
    const saved = localStorage.getItem('pendingActions');
    if (saved) {
      setPendingActions(JSON.parse(saved));
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const addPendingAction = (action: Omit<OfflineAction, 'id' | 'timestamp'>) => {
    const newAction: OfflineAction = {
      ...action,
      id: Date.now().toString(),
      timestamp: Date.now()
    };

    const updated = [...pendingActions, newAction];
    setPendingActions(updated);
    localStorage.setItem('pendingActions', JSON.stringify(updated));
  };

  const syncPendingActions = async () => {
    if (pendingActions.length === 0) return;

    try {
      for (const action of pendingActions) {
        await fetch(action.endpoint, {
          method: action.type === 'CREATE' ? 'POST' : action.type === 'UPDATE' ? 'PUT' : 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
          body: action.type !== 'DELETE' ? JSON.stringify(action.data) : undefined
        });
      }

      setPendingActions([]);
      localStorage.removeItem('pendingActions');
      
      toast({
        title: "Sync complete!",
        description: "All your offline changes have been saved.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sync failed",
        description: "Some changes couldn't be synced. They'll be retried later.",
      });
    }
  };

  return {
    isOnline,
    pendingActions: pendingActions.length,
    addPendingAction,
    syncPendingActions
  };
};