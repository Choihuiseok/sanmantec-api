import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { ArrowLeft, ShieldCheck, Coins, FileText, Wallet } from 'lucide-react';

import type { Screen } from '@/App';

interface VaultDetailProps {
  onNavigate: (screen: Screen) => void;
}

export default function VaultDetail({ onNavigate }: VaultDetailProps) {
  const vault = {
    id: '12',
    status: 'Ready',
    owner: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    heir: '홍길동',
    agent: 'ABC 법무법인',
    network: 'Ethereum',
    assets: {
      tokens: [
        { symbol: 'KAIA', amount: 50 },
        { symbol: 'USDT', amount: 1200 },
      ],
      nftCount: 2,
    },
    progress: 3,
  };

  const progressLabels = [
    '금고 생성',
    '상속인 지정',
    '서류 제출',
    '검증 중',
    '자산 인출 가능',
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-6">
      <Card className="w-full max-w-2xl shadow-md">
        <CardHeader>
          <Button
            variant="ghost"
            className="flex items-center gap-2 mb-3"
            onClick={() => onNavigate('dashboard')}
          >
            <ArrowLeft className="w-4 h-4" />
            돌아가기
          </Button>

          <CardTitle>금고 상세 정보 #{vault.id}</CardTitle>
          <CardDescription>
            금고 상태 및 상속 진행 상황을 확인하세요
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* 금고 상태 */}
          <div>
            <h2 className="text-lg font-semibold mb-2">금고 상태</h2>

            <Badge
              variant={
                vault.status === 'Ready'
                  ? 'default'
                  : vault.status === 'Pending'
                  ? 'secondary'
                  : 'outline'
              }
            >
              {vault.status === 'Ready'
                ? '준비됨'
                : vault.status === 'Pending'
                ? '대기중'
                : '완료'}
            </Badge>
          </div>

          {/* 금고 정보 */}
          <div>
            <h2 className="text-lg font-semibold mb-2">기본 정보</h2>

            <div className="border rounded-md p-4 bg-white space-y-2 text-sm">
              <p>
                <strong className="text-gray-500">네트워크:</strong>{' '}
                {vault.network}
              </p>
              <p>
                <strong className="text-gray-500">소유자 주소:</strong>{' '}
                <code>{vault.owner}</code>
              </p>
              <p>
                <strong className="text-gray-500">상속인:</strong> {vault.heir}
              </p>
              <p>
                <strong className="text-gray-500">대리인:</strong> {vault.agent}
              </p>
            </div>
          </div>

          {/* 진행도 */}
          <div>
            <h2 className="text-lg font-semibold mb-3">상속 진행 상황</h2>

            <div className="space-y-3">
              {progressLabels.map((label, index) => {
                const isCompleted = index + 1 <= vault.progress;
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-2 rounded border ${
                      isCompleted
                        ? 'bg-blue-50 border-blue-300 text-blue-700'
                        : 'bg-gray-100 border-gray-300 text-gray-600'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    {index + 1}. {label}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 금고 자산 */}
          <div>
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Coins className="w-5 h-5" />
              금고 보유 자산
            </h2>

            <div className="border rounded-md p-4 bg-white space-y-3 text-sm">
              {/* 토큰 */}
              <div>
                <p className="font-medium text-gray-700">토큰</p>
                {vault.assets.tokens.map((token, index) => (
                  <p key={index}>
                    • {token.symbol}: {token.amount}
                  </p>
                ))}
              </div>

              {/* NFT */}
              <div>
                <p className="font-medium text-gray-700">NFT 보유량</p>
                <p>• {vault.assets.nftCount}개</p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => onNavigate('submit-death-certificate')}
          >
            <FileText className="w-4 h-4 mr-2" />
            서류 제출
          </Button>

          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => onNavigate('unlock-withdraw')}
          >
            <Wallet className="w-4 h-4 mr-2" />
            자산 인출
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
