import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card';

import {
  Bell,
  Wallet,
  Copy,
  Send,
  Plus,
  Eye,
  AlertCircle,
  FileText,
  Calculator,
  HelpCircle,
} from 'lucide-react';

import type { Screen } from '../../App';

interface DashboardProps {
  userEmail: string;
  isWalletConnected: boolean;
  walletAddress: string | null;
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

export default function Dashboard({
  userEmail,
  isWalletConnected,
  walletAddress,
  onNavigate,
  onWalletConnect,
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState<WalletTab>('all');

  // 📌 실제 연결된 지갑을 리스트에 추가
  const wallets: WalletData[] = [
    {
      id: 'connected',
      nickname: '내 지갑',
      address: walletAddress || '지갑 연결 필요',
      network: 'Kaia Kairos',
      role: 'Owner',
      connected: isWalletConnected,
    },
    {
      id: '2',
      nickname: '예비 지갑',
      address: '0x1234...abcd',
      network: 'Ethereum',
      role: 'Normal',
      connected: false,
    },
  ];

  const ownerVaults: VaultData[] = [
    {
      id: '12',
      ownerWallet: '0x742d...0bEb',
      heirName: '홍길동',
      agent: 'ABC 법무법인',
      willStatus: 'Uploaded',
      state: 'Ready',
    },
  ];

  const heirVaults: VaultData[] = [
    {
      id: '5',
      ownerWallet: '0x9876...4321',
      heirName: '나',
      agent: '법률 서비스 주식회사',
      willStatus: 'Uploaded',
      state: 'Pending',
    },
  ];

  const filteredWallets = wallets.filter(wallet => {
    if (activeTab === 'all') return true;
    return wallet.role.toLowerCase() === activeTab;
  });

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ---------------- 헤더 ---------------- */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white">S</span>
            </div>
            <span className="text-blue-600 font-medium">Sanmantec</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-right">
              <div className="text-muted-foreground">사용자</div>
              <div>{userEmail || 'user@example.com'}</div>
            </div>

            {isWalletConnected ? (
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                지갑 연결됨
              </Badge>
            ) : (
              <Button variant="outline" size="sm" onClick={onWalletConnect}>
                <Wallet className="w-4 h-4 mr-2" /> 지갑 연결
              </Button>
            )}

            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ---------------- 메인 컨텐츠 ---------------- */}
        <div className="lg:col-span-2 space-y-6">
          {/* ----- 내 지갑 ----- */}
          <Card>
            <CardHeader>
              <CardTitle>내 지갑</CardTitle>
              <CardDescription>연결된 지갑 목록</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Tabs */}
              <div className="flex gap-2 border-b">
                {['all', 'owner', 'heir', 'normal'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as WalletTab)}
                    className={`px-4 py-2 border-b-2 transition-colors ${
                      activeTab === tab
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-muted-foreground'
                    }`}
                  >
                    {
                      {
                        all: '전체',
                        owner: '소유자',
                        heir: '상속인',
                        normal: '일반',
                      }[tab]
                    }
                  </button>
                ))}
              </div>

              {/* Wallet List */}
              <div className="space-y-3">
                {filteredWallets.map(wallet => (
                  <div
                    key={wallet.id}
                    className="p-4 border rounded-lg bg-white shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span>{wallet.nickname}</span>
                          <Badge>{wallet.role}</Badge>
                        </div>

                        <div className="text-sm flex items-center gap-2">
                          <code className="text-xs">{wallet.address}</code>
                          <button
                            onClick={() => copyAddress(wallet.address)}
                            className="hover:text-blue-600"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          네트워크: {wallet.network}
                        </div>
                      </div>

                      <Badge
                        variant={wallet.connected ? 'outline' : 'secondary'}
                        className={
                          wallet.connected
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : ''
                        }
                      >
                        {wallet.connected ? '연결됨' : '해제됨'}
                      </Badge>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        잔액 확인
                      </Button>
                      <Button size="sm" variant="outline">
                        <Send className="w-3 h-3 mr-1" /> 전송
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ----- 소유 금고 ----- */}
          <Card>
            <CardHeader className="flex justify-between">
              <div>
                <CardTitle>내 상속 금고</CardTitle>
                <CardDescription>내가 소유한 금고</CardDescription>
              </div>

              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => onNavigate('create-vault')}
              >
                <Plus className="w-4 h-4 mr-2" /> 금고 생성
              </Button>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {ownerVaults.map(vault => (
                  <div
                    key={vault.id}
                    className="p-4 border rounded bg-white shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span>금고 #{vault.id}</span>
                          <Badge>{vault.state}</Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            소유자: <code>{vault.ownerWallet}</code>
                          </div>
                          <div>상속인: {vault.heirName}</div>
                          <div>대리인: {vault.agent}</div>
                          <div>
                            유언장:{' '}
                            <Badge variant="outline">{vault.willStatus}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => onNavigate('vault-detail')}
                      size="sm"
                      variant="outline"
                      className="mt-3"
                    >
                      <Eye className="w-3 h-3 mr-1" /> 상세보기
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ----- 상속받는 금고 ----- */}
          <Card>
            <CardHeader>
              <CardTitle>상속인으로 지정된 금고</CardTitle>
              <CardDescription>나에게 배정된 금고</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {heirVaults.map(vault => (
                  <div
                    key={vault.id}
                    className="p-4 border rounded bg-white shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span>금고 #{vault.id}</span>
                          <Badge variant="secondary">{vault.state}</Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            소유자: <code>{vault.ownerWallet}</code>
                          </div>
                          <div>대리인: {vault.agent}</div>
                          <div className="col-span-2">
                            유언장:{' '}
                            <Badge variant="outline">{vault.willStatus}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button
                        onClick={() => onNavigate('vault-detail')}
                        size="sm"
                        variant="outline"
                      >
                        <Eye className="w-3 h-3 mr-1" /> 상세보기
                      </Button>

                      <Button
                        onClick={() => onNavigate('submit-death-certificate')}
                        size="sm"
                        variant="outline"
                        className="text-blue-600"
                      >
                        서류 제출
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ---------------- 오른쪽 사이드바 ---------------- */}
        <div className="space-y-4">
          {/* 알림 */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <AlertCircle className="w-5 h-5" />
                상속 진행 알림
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-blue-900">
              <div className="p-2 bg-white rounded">
                금고 #5: 서류 검증 대기중
              </div>
              <div className="p-2 bg-white rounded">금고 #12: 준비 완료</div>
            </CardContent>
          </Card>

          {/* 유언장 가이드 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                유언장 제출 가이드
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                유언장을 업로드하고 검증하는 방법을 안내합니다.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                가이드 읽기
              </Button>
            </CardContent>
          </Card>

          {/* 상속세 안내 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                상속세 안내
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                디지털 자산 상속 관련 세금 정보를 확인하세요.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                자세히 보기
              </Button>
            </CardContent>
          </Card>

          {/* 고객센터 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                고객 지원
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                문제가 있으신가요? 저희가 도와드릴게요.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                고객센터 문의
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
