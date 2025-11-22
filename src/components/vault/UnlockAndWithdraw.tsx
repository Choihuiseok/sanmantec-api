import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { ArrowLeft, Wallet as WalletIcon } from 'lucide-react';
import type { Screen } from '@/App';

interface UnlockProps {
  onNavigate: (screen: Screen) => void;
}

export default function UnlockAndWithdraw({ onNavigate }: UnlockProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-6">
      <Card className="w-full max-w-lg shadow-md">
        <CardHeader>
          <Button
            variant="ghost"
            className="flex items-center gap-2 mb-2"
            onClick={() => onNavigate('vault-detail')}
          >
            <ArrowLeft className="w-4 h-4" />
            돌아가기
          </Button>

          <CardTitle className="text-xl">자산 인출</CardTitle>
          <CardDescription className="mt-2">
            상속이 승인되어 금고 자산을 인출할 수 있습니다.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <label className="text-sm block mb-1">인출 금액</label>
            <Input placeholder="예: 10" />
          </div>

          <div>
            <label className="text-sm block mb-1">토큰 종류</label>
            <Input placeholder="KAIA / USDT 등" />
          </div>
        </CardContent>

        <CardFooter className="justify-end">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <WalletIcon className="w-4 h-4 mr-2" />
            인출하기
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
