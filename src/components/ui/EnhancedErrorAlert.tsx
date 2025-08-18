import React, { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { 
  AlertCircle, 
  Wifi, 
  RefreshCw, 
  Clock, 
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { AppError } from '@/lib/error-handling';

interface EnhancedErrorAlertProps {
  error: AppError;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export const EnhancedErrorAlert: React.FC<EnhancedErrorAlertProps> = ({
  error,
  onRetry,
  onDismiss,
  className = '',
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const getErrorIcon = () => {
    switch (error.type) {
      case 'NETWORK':
        return <Wifi className="h-4 w-4" />;
      case 'PAYMENT':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getErrorColor = () => {
    switch (error.type) {
      case 'NETWORK':
        return 'bg-orange-500/10 border-orange-500 text-orange-400';
      case 'PAYMENT':
        return 'bg-red-500/10 border-red-500 text-red-400';
      case 'VALIDATION':
        return 'bg-yellow-500/10 border-yellow-500 text-yellow-400';
      default:
        return 'bg-red-500/10 border-red-500 text-red-400';
    }
  };

  const getSupportActions = () => {
    switch (error.type) {
      case 'NETWORK':
        return (
          <div className="text-sm mt-2 space-y-1">
            <p>• Check your internet connection</p>
            <p>• Try refreshing the page</p>
            <p>• Disable any VPN or proxy</p>
          </div>
        );
      case 'PAYMENT':
        return (
          <div className="text-sm mt-2 space-y-1">
            <p>• Ensure you have sufficient balance</p>
            <p>• Check if your payment method is active</p>
            <p>• Try a different payment method</p>
            <p>• Contact your bank if the issue persists</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Alert className={`${getErrorColor()} ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-2 flex-1">
          {getErrorIcon()}
          <div className="flex-1">
            <AlertDescription className="font-medium">
              {error.userFriendlyMessage}
            </AlertDescription>
            
            {error.code && (
              <div className="text-xs opacity-75 mt-1">
                Error Code: {error.code}
              </div>
            )}

            {getSupportActions()}

            {error.technical && (
              <div className="mt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-xs h-6 p-1 text-current hover:bg-current/10"
                >
                  {showDetails ? (
                    <>
                      <ChevronUp className="h-3 w-3 mr-1" />
                      Hide Details
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3 w-3 mr-1" />
                      Show Details
                    </>
                  )}
                </Button>
                
                {showDetails && (
                  <div className="mt-2 p-2 bg-black/20 rounded text-xs font-mono break-all">
                    <div className="text-xs font-sans mb-1 opacity-75">Technical Details:</div>
                    {error.technical}
                    <div className="mt-1 text-xs font-sans opacity-50">
                      Timestamp: {error.timestamp.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          {error.retryable && onRetry && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRetry}
              className="text-current hover:bg-current/10 h-8 px-3"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Retry
            </Button>
          )}
          
          {onDismiss && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismiss}
              className="text-current hover:bg-current/10 h-8 px-2"
            >
              ×
            </Button>
          )}
        </div>
      </div>

      {error.type === 'PAYMENT' && (
        <div className="mt-3 pt-3 border-t border-current/20">
          <div className="flex items-center gap-4 text-xs">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open('mailto:support@literovia.com', '_blank')}
              className="text-current hover:bg-current/10 h-7 px-2"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Contact Support
            </Button>
            
            <div className="flex items-center gap-1 opacity-75">
              <Clock className="h-3 w-3" />
              Response within 2 hours
            </div>
          </div>
        </div>
      )}
    </Alert>
  );
};

interface ConnectionStatusProps {
  isOnline: boolean;
  className?: string;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  isOnline,
  className = '',
}) => {
  if (isOnline) return null;

  return (
    <Alert className={`bg-orange-500/10 border-orange-500 text-orange-400 ${className}`}>
      <Wifi className="h-4 w-4" />
      <AlertDescription>
        <div className="font-medium">No internet connection</div>
        <div className="text-sm mt-1 opacity-75">
          Please check your connection and try again.
        </div>
      </AlertDescription>
    </Alert>
  );
};
