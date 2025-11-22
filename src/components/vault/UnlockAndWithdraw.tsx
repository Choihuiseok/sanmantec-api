import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  CheckCircle,
  Wallet,
  ArrowLeft,
  ArrowRight,
  Coins,
} from 'lucide-react';
import type { Screen } from '../../App';

interface UnlockAndWithdrawProps {
  onNavigate: (screen: Screen) => void;
}

interface Asset {
  symbol: string;
  balance: number;
  network: string;
}

export default function UnlockAndWithdraw({
  onNavigate,
}: UnlockAndWithdrawProps) {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [amount, setAmount] = useState('');
  const [done, setDone] = useState(false);

  const assets: Asset[] = [
    { symbol: 'ETH', balance: 1.25, network: 'Ethereum' },
    { symbol: 'KAIA', balance: 530, network: 'Kaia' },
    { symbol: 'USDT', balance: 2300, network: 'Ethereum' },
  ];

  const handleWithdraw = () => {
    if (!selectedAsset) return;
    if (Number(amount) <= 0 || Number(amount) > selectedAsset.balance) return;
    setDone(true);
  };

  // ------------------- 3단계: 인출 완료 화면 -------------------
  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <Card className="w-full max-w-md shadow">
          <CardHeader className="flex items-center flex-col gap-2">
            <CheckCircle className="w-12 h-12 text-green-600" />
            <CardTitle>인출 완료</CardTitle>
            <CardDescription>
              자산 인출이 성공적으로 처리되었습니다.
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex flex-col gap-3">
            <Button
              className="bg-blue-600 hover:bg-blue-700 w-full"
              onClick={() => onNavigate('dashboard')}
            >
              대시보드로 돌아가기
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // ------------------- 2단계: 자산 인출 입력 -------------------
  if (selectedAsset) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <Card className="w-full max-w-lg shadow-md">
          <CardHeader>
            <Button
              variant="ghost"
              onClick={() => setSelectedAsset(null)}
              className="flex items-center gap-2 mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              자산 목록으로
            </Button>

            <CardTitle>{selectedAsset.symbol} 인출</CardTitle>
            <CardDescription>
              현재 잔액 {selectedAsset.balance} {selectedAsset.symbol}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm">인출 수량</label>
              <Input
                placeholder="0"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                type="number"
              />
              {Number(amount) > selectedAsset.balance && (
                <p className="text-red-500 text-sm">잔액을 초과했습니다.</p>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <Button
              className="bg-blue-600 hover:bg-blue-700 w-full"
              disabled={
                !amount ||
                Number(amount) <= 0 ||
                Number(amount) > selectedAsset.balance
              }
              onClick={handleWithdraw}
            >
              인출하기
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // ------------------- 1단계: 금고 잠금 해제 + 자산 목록 -------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-xl shadow-md">
        <CardHeader>
          <Button
            variant="ghost"
            onClick={() => onNavigate('vault-detail')}
            className="flex items-center gap-2 mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> 금고 상세로
          </Button>

          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-blue-600" />
            금고 잠금 해제됨
          </CardTitle>
          <CardDescription>
            서류 검증이 완료되었습니다. 이제 자산을 인출할 수 있습니다.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <h2 className="font-semibold text-lg mt-2">보유 자산</h2>

          <div className="space-y-3">
            {assets.map(asset => (
              <div
                key={asset.symbol}
                className="p-4 border rounded-lg bg-white flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">{asset.symbol}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {asset.balance} {asset.symbol}
                  </p>
                  <Badge className="mt-1" variant="outline">
                    {asset.network}
                  </Badge>
                </div>

                <Button
                  variant="outline"
                  onClick={() => setSelectedAsset(asset)}
                >
                  인출 →
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
