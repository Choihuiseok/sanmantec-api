import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Bell, Wallet, Copy, Send, Plus, Eye, AlertCircle, FileText, Calculator, HelpCircle } from 'lucide-react';
import type { Screen } from '../../App';

interface DashboardProps {
  userEmail: string;
  isWalletConnected: boolean;
  onNavigate: (screen: Screen) => void;
  onWalletConnect: () => void;
}

type WalletTab = 'all' | 'owner' | 'heir' | 'normal';

interface WalletData {
  id: string;
  nickname: string;
  address: string;
  network: string;
  role: 'Owner' | 'Heir' | 'Normal';
  connected: boolean;
}

interface VaultData {
  id: string;
  ownerWallet: string;
  heirName: string;
  agent: string;
  willStatus: 'Uploaded' | 'Not Uploaded';
  state: 'Ready' | 'Pending' | 'Completed';
}

export default function Dashboard({ userEmail, isWalletConnected, onNavigate, onWalletConnect }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<WalletTab>('all');

  const wallets: WalletData[] = [
    {
      id: '1',
      nickname: 'Main Wallet',
      address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      network: 'Ethereum',
      role: 'Owner',
      connected: true
    },
    {
      id: '2',
      nickname: 'Kaia Wallet',
      address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      network: 'Kaia',
      role: 'Normal',
      connected: true
    },
    {
      id: '3',
      nickname: 'Inheritance Wallet',
      address: '0x1234567890123456789012345678901234567890',
      network: 'Ethereum',
      role: 'Heir',
      connected: false
    }
  ];

  const ownerVaults: VaultData[] = [
    {
      id: '12',
      ownerWallet: '0x742d...0bEb',
      heirName: '홍길동',
      agent: 'ABC 법무법인',
      willStatus: 'Uploaded',
      state: 'Ready'
    },
    {
      id: '8',
      ownerWallet: '0x742d...0bEb',
      heirName: '김영희',
      agent: '미지정',
      willStatus: 'Not Uploaded',
      state: 'Pending'
    }
  ];

  const heirVaults: VaultData[] = [
    {
      id: '5',
      ownerWallet: '0x9876...4321',
      heirName: '나',
      agent: '법률 서비스 주식회사',
      willStatus: 'Uploaded',
      state: 'Pending'
    }
  ];

  const filteredWallets = wallets.filter(wallet => {
    if (activeTab === 'all') return true;
    if (activeTab === 'owner') return wallet.role === 'Owner';
    if (activeTab === 'heir') return wallet.role === 'Heir';
    if (activeTab === 'normal') return wallet.role === 'Normal';
    return true;
  });

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white">S</span>
              </div>
              <span className="text-blue-600">Sanmantec</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm">
                <div className="text-muted-foreground">사용자</div>
                <div>{userEmail || 'user@example.com'}</div>
              </div>
              
              {!isWalletConnected ? (
                <Button onClick={onWalletConnect} variant="outline" size="sm">
                  <Wallet className="w-4 h-4 mr-2" />
                  지갑 연결
                </Button>
              ) : (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  지갑 연결됨
                </Badge>
              )}
              
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Wallet List Section */}
            <Card>
              <CardHeader>
                <CardTitle>내 지갑</CardTitle>
                <CardDescription>연결된 지갑을 관리하세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Tabs */}
                <div className="flex gap-2 border-b">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-4 py-2 border-b-2 transition-colors ${
                      activeTab === 'all' ? 'border-blue-600 text-blue-600' : 'border-transparent text-muted-foreground'
                    }`}
                  >
                    전체
                  </button>
                  <button
                    onClick={() => setActiveTab('owner')}
                    className={`px-4 py-2 border-b-2 transition-colors ${
                      activeTab === 'owner' ? 'border-blue-600 text-blue-600' : 'border-transparent text-muted-foreground'
                    }`}
                  >
                    소유자 지갑
                  </button>
                  <button
                    onClick={() => setActiveTab('heir')}
                    className={`px-4 py-2 border-b-2 transition-colors ${
                      activeTab === 'heir' ? 'border-blue-600 text-blue-600' : 'border-transparent text-muted-foreground'
                    }`}
                  >
                    상속인 지갑
                  </button>
                  <button
                    onClick={() => setActiveTab('normal')}
                    className={`px-4 py-2 border-b-2 transition-colors ${
                      activeTab === 'normal' ? 'border-blue-600 text-blue-600' : 'border-transparent text-muted-foreground'
                    }`}
                  >
                    일반 지갑
                  </button>
                </div>

                {/* Wallet Cards */}
                <div className="space-y-3">
                  {filteredWallets.map(wallet => (
                    <div key={wallet.id} className="p-4 border rounded-lg bg-white shadow-sm">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span>{wallet.nickname}</span>
                            <Badge variant={wallet.role === 'Owner' ? 'default' : wallet.role === 'Heir' ? 'secondary' : 'outline'}>
                              {wallet.role}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <code className="text-xs">{wallet.address}</code>
                            <button onClick={() => copyAddress(wallet.address)} className="hover:text-blue-600">
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            네트워크: {wallet.network}
                          </div>
                        </div>
                        <Badge variant={wallet.connected ? 'outline' : 'secondary'} className={wallet.connected ? 'bg-green-50 text-green-700 border-green-200' : ''}>
                          {wallet.connected ? '연결됨' : '연결 해제됨'}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">잔액 확인</Button>
                        <Button size="sm" variant="outline">
                          <Send className="w-3 h-3 mr-1" />
                          전송
                        </Button>
                        {wallet.role === 'Owner' && (
                          <Button size="sm" variant="outline" className="text-blue-600">
                            금고에 사용
                          </Button>
                        )}
                        {wallet.connected && (
                          <Button size="sm" variant="ghost">연결 해제</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* My Inheritance Vaults */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>내 상속 금고 (소유자)</CardTitle>
                  <CardDescription>내가 소유한 금고</CardDescription>
                </div>
                <Button onClick={() => onNavigate('create-vault')} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  금고 생성
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ownerVaults.map(vault => (
                    <div key={vault.id} className="p-4 border rounded-lg bg-white shadow-sm">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span>금고 #{vault.id}</span>
                            <Badge variant={
                              vault.state === 'Ready' ? 'default' : 
                              vault.state === 'Pending' ? 'secondary' : 
                              'outline'
                            }>
                              {vault.state === 'Ready' ? '준비됨' : vault.state === 'Pending' ? '대기중' : '완료'}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">소유자: </span>
                              <code className="text-xs">{vault.ownerWallet}</code>
                            </div>
                            <div>
                              <span className="text-muted-foreground">상속인: </span>
                              {vault.heirName}
                            </div>
                            <div>
                              <span className="text-muted-foreground">대리인: </span>
                              {vault.agent}
                            </div>
                            <div>
                              <span className="text-muted-foreground">유언장: </span>
                              <Badge variant={vault.willStatus === 'Uploaded' ? 'outline' : 'secondary'} className="text-xs">
                                {vault.willStatus === 'Uploaded' ? '업로드됨' : '미업로드'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button onClick={() => onNavigate('vault-detail')} size="sm" variant="outline">
                        <Eye className="w-3 h-3 mr-1" />
                        상세보기
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Vaults Where I am Heir */}
            <Card>
              <CardHeader>
                <CardTitle>상속인으로 지정된 금고</CardTitle>
                <CardDescription>나에게 할당된 상속 금고</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {heirVaults.map(vault => (
                    <div key={vault.id} className="p-4 border rounded-lg bg-white shadow-sm">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span>금고 #{vault.id}</span>
                            <Badge variant="secondary">{vault.state === 'Pending' ? '대기중' : vault.state}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">소유자: </span>
                              <code className="text-xs">{vault.ownerWallet}</code>
                            </div>
                            <div>
                              <span className="text-muted-foreground">대리인: </span>
                              {vault.agent}
                            </div>
                            <div className="col-span-2">
                              <span className="text-muted-foreground">유언장: </span>
                              <Badge variant={vault.willStatus === 'Uploaded' ? 'outline' : 'secondary'} className="text-xs">
                                {vault.willStatus === 'Uploaded' ? '업로드됨' : '미업로드'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => onNavigate('vault-detail')} size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          상세보기
                        </Button>
                        <Button onClick={() => onNavigate('submit-death-certificate')} size="sm" variant="outline" className="text-blue-600">
                          서류 제출
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Widgets */}
          <div className="space-y-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <AlertCircle className="w-5 h-5" />
                  상속 진행 알림
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-blue-900">
                  <div className="p-2 bg-white rounded">
                    금고 #5: 사망증명서 제출됨, 검증 대기중
                  </div>
                  <div className="p-2 bg-white rounded">
                    금고 #12: 모든 요구사항 충족, 금고 준비완료
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  유언장 제출 가이드
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  유언장 문서를 올바르게 업로드하고 검증하는 방법을 알아보세요.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  가이드 읽기
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  상속세 안내
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  디지털 자산 상속에 대한 세금 관련 사항을 알아보세요.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  자세히 보기
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  도움이 필요하신가요?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  고객 지원팀이 도와드리겠습니다.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  고객센터 문의
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}