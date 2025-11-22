import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowLeft, Copy, CheckCircle2, Circle, Clock } from 'lucide-react';
import type { Screen } from '../../App';

interface VaultDetailProps {
  onNavigate: (screen: Screen) => void;
}

export default function VaultDetail({ onNavigate }: VaultDetailProps) {
  const vaultAddress = '0x1234567890abcdef1234567890abcdef12345678';

  const copyAddress = () => {
    navigator.clipboard.writeText(vaultAddress);
  };

  const steps = [
    { name: '사망증명서 제출', status: 'completed' },
    { name: '유언장 검증', status: 'in-progress' },
    { name: '상속인 KYC', status: 'pending' },
    { name: '금고 잠금해제 (접근권 이전)', status: 'pending' },
    { name: '자산 인출', status: 'pending' }
  ];

  const assets = [
    { token: 'ETH', amount: '2.5', value: '$4,250' },
    { token: 'KAIA', amount: '1,000', value: '$850' },
    { token: 'USDT', amount: '5,000', value: '$5,000' }
  ];

  const nfts = [
    { name: 'Bored Ape #1234', collection: 'BAYC', image: '🐵' },
    { name: 'CryptoPunk #5678', collection: 'CryptoPunks', image: '👾' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            onClick={() => onNavigate('dashboard')}
            variant="ghost"
            size="sm"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            대시보드로 돌아가기
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-2">상속 금고 #12</h1>
              <div className="flex items-center gap-2 text-sm">
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">{vaultAddress}</code>
                <button onClick={copyAddress} className="hover:text-blue-600">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            <Badge className="bg-blue-600">Ethereum</Badge>
          </div>
        </div>

        <div className="space-y-6">
          {/* Vault Overview */}
          <Card>
            <CardHeader>
              <CardTitle>금고 개요</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">소유자 지갑</div>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">0x742d35Cc...0bEb</code>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">상속인 이름</div>
                    <div>홍길동</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">상속인 이메일</div>
                    <div>hong@example.com</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">상속인 지갑</div>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">0x9876...4321</code>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">대리인 이름</div>
                    <div>ABC 법무법인</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">대리인 이메일</div>
                    <div>contact@legalfirmabc.com</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">대리인 관계</div>
                    <div>법률 대리인</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">유언장 상태</div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      업로드됨
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Tracker */}
          <Card>
            <CardHeader>
              <CardTitle>상속 진행 현황</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      {step.status === 'completed' ? (
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        </div>
                      ) : step.status === 'in-progress' ? (
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <Circle className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                      {index < steps.length - 1 && (
                        <div className={`w-0.5 h-8 ${step.status === 'completed' ? 'bg-green-200' : 'bg-gray-200'}`} />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className={step.status !== 'pending' ? '' : 'text-muted-foreground'}>
                        {step.name}
                      </div>
                      {step.status === 'in-progress' && (
                        <div className="text-sm text-blue-600 mt-1">진행중...</div>
                      )}
                    </div>
                    {step.status === 'completed' && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        완료
                      </Badge>
                    )}
                    {step.status === 'in-progress' && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        진행중
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Vault Assets */}
          <Card>
            <CardHeader>
              <CardTitle>금고 자산</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Tokens */}
                <div>
                  <h3 className="mb-3">토큰 잔액</h3>
                  <div className="space-y-2">
                    {assets.map((asset, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div>{asset.token}</div>
                          <div className="text-sm text-muted-foreground">{asset.value}</div>
                        </div>
                        <div>{asset.amount}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* NFTs */}
                <div>
                  <h3 className="mb-3">NFTs</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {nfts.map((nft, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="text-4xl mb-2 text-center">{nft.image}</div>
                        <div className="text-sm">{nft.name}</div>
                        <div className="text-xs text-muted-foreground">{nft.collection}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-muted-foreground text-center pt-2">
                  자산은 읽기 전용입니다. 잠금 해제 후 인출이 가능합니다.
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Submission */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle>서류 제출</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                이 섹션은 상속인 또는 대리인이 필요한 서류를 제출할 수 있습니다.
              </p>
              <Button onClick={() => onNavigate('submit-death-certificate')} className="bg-blue-600 hover:bg-blue-700">
                사망증명서 제출
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}