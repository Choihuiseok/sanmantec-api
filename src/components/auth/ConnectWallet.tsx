import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Wallet } from 'lucide-react';

interface ConnectWalletProps {
  onConnect: (address: string) => void; // ⭐ 주소 전달
}

export default function ConnectWallet({ onConnect }: ConnectWalletProps) {
  const [error, setError] = useState('');

  const connectWallet = async () => {
    setError('');

    // 1) 지갑 확장팩 있는지 확인
    const { ethereum } = window as any;

    if (!ethereum) {
      setError('지갑 확장 프로그램(Metamask/Kaia)이 설치되어 있지 않습니다.');
      return;
    }

    try {
      // 2) 지갑 연결 요청
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      const address = accounts[0];
      console.log('📌 Wallet Address:', address);

      // 3) App.tsx로 주소 전달 → Dashboard 이동
      onConnect(address);
    } catch (err) {
      console.error(err);
      setError('지갑 연결에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Wallet className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-center">지갑 연결</CardTitle>
          <CardDescription className="text-center">
            상속 금고를 생성하기 전에 브라우저 지갑(Metamask/Kaia)을 연결하세요.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-center text-muted-foreground">
            블록체인에서 상속 금고를 생성하고 관리하려면 지갑이 필요합니다.
          </p>

          {/* 에러 메시지 */}
          {error && <p className="text-center text-sm text-red-500">{error}</p>}

          <Button
            onClick={connectWallet}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Wallet className="w-4 h-4 mr-2" />
            지갑 연결
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
