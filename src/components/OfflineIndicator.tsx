import React from 'react';
import { useOfflineSync } from '../hooks/useOfflineSync';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WifiOff, Wifi, RefreshCw } from 'lucide-react';

const OfflineIndicator: React.FC = () => {
  const { isOnline, pendingActions, syncPendingActions } = useOfflineSync();

  if (isOnline && pendingActions === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center gap-2">
        {!isOnline && (
          <Badge variant="destructive" className="flex items-center gap-1">
            <WifiOff className="h-3 w-3" />
            Offline
          </Badge>
        )}
        
        {pendingActions > 0 && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <RefreshCw className="h-3 w-3" />
            {pendingActions} pending
          </Badge>
        )}
        
        {isOnline && pendingActions > 0 && (
          <Button size="sm" variant="outline" onClick={syncPendingActions}>
            <Wifi className="h-3 w-3 mr-1" />
            Sync
          </Button>
        )}
      </div>
    </div>
  );
};

export default OfflineIndicator;