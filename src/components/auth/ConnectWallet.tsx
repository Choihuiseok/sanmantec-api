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
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Metamask 또는 Kaia 지갑을 설치해주세요.');
      return;
    }

    try {
      // 🔵 지갑 연결 요청
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const address = accounts[0];
      console.log('지갑 연결됨:', address);

      // 🔵 App으로 주소 전달
      onConnect(address);
    } catch (error) {
      console.error('지갑 연결 실패:', error);
      alert('지갑 연결 중 오류가 발생했습니다.');
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
            상속 금고를 생성하기 전에 브라우저 지갑을 연결하세요.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-center text-muted-foreground">
            블록체인 상속 금고를 생성하려면 지갑 연결이 필요합니다.
          </p>

          <Button
            onClick={connectWallet}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Wallet className="w-4 h-4 mr-2" />
            지갑 연결하기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
