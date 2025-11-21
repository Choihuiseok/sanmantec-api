import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { ArrowLeft, CheckCircle2, Wallet, Download, Sparkles } from 'lucide-react';
import type { Screen } from '../../App';

interface UnlockAndWithdrawProps {
  onNavigate: (screen: Screen) => void;
}

type Step = 'unlock' | 'withdraw' | 'complete';

export default function UnlockAndWithdraw({ onNavigate }: UnlockAndWithdrawProps) {
  const [currentStep, setCurrentStep] = useState<Step>('unlock');
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);

  const assets = [
    { id: 'eth', token: 'ETH', amount: '2.5', value: '$4,250', type: 'token' },
    { id: 'kaia', token: 'KAIA', amount: '1,000', value: '$850', type: 'token' },
    { id: 'usdt', token: 'USDT', amount: '5,000', value: '$5,000', type: 'token' },
    { id: 'nft1', token: 'Bored Ape #1234', amount: '1', value: 'NFT', type: 'nft' },
    { id: 'nft2', token: 'CryptoPunk #5678', amount: '1', value: 'NFT', type: 'nft' }
  ];

  const toggleAsset = (assetId: string) => {
    setSelectedAssets(prev =>
      prev.includes(assetId)
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const handleWithdraw = () => {
    setCurrentStep('complete');
  };

  // Step 1: Unlock Complete
  if (currentStep === 'unlock') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <CardTitle>접근 권한이 이전되었습니다</CardTitle>
            <CardDescription>
              모든 검증 단계가 성공적으로 완료되었습니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
              <h3 className="mb-3 text-center">🎉 금고 잠금 해제</h3>
              <p className="text-center text-muted-foreground">
                이제 이 상속 금고를 완전히 제어할 수 있습니다. 모든 자산을 지갑으로 인출할 준비가 되었습니다.
              </p>
            </div>

            <div className="space-y-3">
              <h3>완료된 검증 단계</h3>
              <div className="space-y-2">
                {[
                  '사망증명서 검증 완료',
                  '유언장 검증 완료',
                  '상속인 KYC 승인',
                  '접근권 이전 완료'
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-green-900">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border rounded-lg bg-blue-50">
              <h3 className="mb-2">다음 단계</h3>
              <p className="text-sm text-muted-foreground mb-4">
                이제 상속받은 자산을 연결된 지갑으로 인출할 수 있습니다. 이 작업은 소유권을 영구적으로 이전합니다.
              </p>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => onNavigate('dashboard')} variant="outline" className="flex-1">
                대시보드로 돌아가기
              </Button>
              <Button onClick={() => setCurrentStep('withdraw')} className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                자산 인출
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Step 2: Withdraw Assets Modal
  if (currentStep === 'withdraw') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            onClick={() => setCurrentStep('unlock')}
            variant="ghost"
            size="sm"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            이전
          </Button>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>자산 인출</CardTitle>
              <CardDescription>
                지갑으로 인출할 자산을 선택하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span>인출 대상:</span>
                  <Badge variant="outline" className="bg-white">
                    <Wallet className="w-3 h-3 mr-1" />
                    연결된 지갑
                  </Badge>
                </div>
                <code className="text-xs bg-white px-2 py-1 rounded">
                  0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
                </code>
              </div>

              <div className="space-y-3">
                <h3>사용 가능한 자산</h3>
                
                {/* Tokens */}
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">토큰</div>
                  {assets.filter(a => a.type === 'token').map(asset => (
                    <label
                      key={asset.id}
                      className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <Checkbox
                        checked={selectedAssets.includes(asset.id)}
                        onCheckedChange={() => toggleAsset(asset.id)}
                      />
                      <div className="flex-1 flex items-center justify-between">
                        <div>
                          <div>{asset.token}</div>
                          <div className="text-sm text-muted-foreground">{asset.value}</div>
                        </div>
                        <div>{asset.amount}</div>
                      </div>
                    </label>
                  ))}
                </div>

                {/* NFTs */}
                <div className="space-y-2 mt-4">
                  <div className="text-sm text-muted-foreground">NFTs</div>
                  <div className="grid grid-cols-2 gap-3">
                    {assets.filter(a => a.type === 'nft').map(asset => (
                      <label
                        key={asset.id}
                        className="relative p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                      >
                        <div className="absolute top-2 right-2">
                          <Checkbox
                            checked={selectedAssets.includes(asset.id)}
                            onCheckedChange={() => toggleAsset(asset.id)}
                          />
                        </div>
                        <div className="text-4xl mb-2 text-center">
                          {asset.id === 'nft1' ? '🐵' : '👾'}
                        </div>
                        <div className="text-sm">{asset.token}</div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {selectedAssets.length > 0 && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700 mb-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{selectedAssets.length}개 자산 선택됨</span>
                  </div>
                </div>
              )}

              <div className="p-4 border-l-4 border-amber-600 bg-amber-50">
                <h3 className="mb-2 text-amber-900">⚠️ 중요</h3>
                <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
                  <li>이 작업은 지갑 확인이 필요합니다</li>
                  <li>자산은 지갑으로 영구적으로 이전됩니다</li>
                  <li>트랜잭션에 가스 수수료가 발생할 수 있습니다</li>
                </ul>
              </div>

              <Button
                onClick={handleWithdraw}
                disabled={selectedAssets.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Wallet className="w-4 h-4 mr-2" />
                내 지갑으로 인출 ({selectedAssets.length})
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Step 3: Completion Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg border-2 border-green-200">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-14 h-14 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl">상속 완료</CardTitle>
          <CardDescription className="text-lg">
            자산이 성공적으로 지갑으로 이전되었습니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
            <h3 className="mb-3 text-center text-green-900">🎊 이전 성공</h3>
            <p className="text-center text-muted-foreground mb-4">
              상속 절차가 완료되었습니다. 선택한 모든 자산이 이제 지갑에 있습니다.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="text-muted-foreground mb-1">이전된 자산</div>
                <div className="text-xl">{selectedAssets.length}</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="text-muted-foreground mb-1">총 가치</div>
                <div className="text-xl">$10,100</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3>이전된 자산</h3>
            <div className="space-y-2">
              {assets
                .filter(asset => selectedAssets.includes(asset.id))
                .map(asset => (
                  <div key={asset.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span>{asset.token}</span>
                    </div>
                    <span>{asset.amount}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="mb-2">다음 단계</h3>
            <p className="text-sm text-muted-foreground">
              이제 지갑에서 이러한 자산을 관리할 수 있습니다. 상속 금고는 완료로 표시되고 보관됩니다.
            </p>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => onNavigate('dashboard')} variant="outline" className="flex-1">
              대시보드 보기
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              <Wallet className="w-4 h-4 mr-2" />
              지갑 열기
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}