import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, Download } from 'lucide-react';
import qrCodeImage from '@/assets/VNR QR Code-1.png';

interface PaymentQRProps {
  onClose: () => void;
}

const PaymentQR: React.FC<PaymentQRProps> = ({ onClose }) => {
  const amount = "150";

  const handleDownloadQR = () => {
    // Create a link to download the QR code
    const link = document.createElement('a');
    link.href = qrCodeImage;
    link.download = 'literovia-payment-qr.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-gray-900 border-gray-700 max-w-md w-full">
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-2">
              <QrCode className="h-6 w-6 text-blue-400 mr-2" />
              <h3 className="text-xl font-semibold text-white">Payment QR Code</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Scan the QR code to pay ₹{amount}
            </p>
          </div>

          {/* QR Code Image */}
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-lg">
              <img 
                src={qrCodeImage} 
                alt="Payment QR Code"
                className="w-48 h-48 object-contain"
              />
            </div>
          </div>

          {/* Amount Info */}
          <div className="text-center mb-6">
            <p className="text-gray-400 text-sm">Registration Fee</p>
            <p className="text-2xl font-bold text-green-400">₹{amount}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleDownloadQR}
              className="flex-1 border-gray-600 hover:bg-gray-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Download QR
            </Button>
            <Button
              onClick={onClose}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Done
            </Button>
          </div>

          {/* Instructions */}
          <div className="mt-4 text-xs text-gray-500 text-center">
            <p>• Open any UPI app (PhonePe, GPay, Paytm)</p>
            <p>• Scan QR code to pay ₹{amount}</p>
            <p>• Take screenshot and upload in the form</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentQR;