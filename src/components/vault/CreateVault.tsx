import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

import type { Screen } from '../../../App';

interface CreateVaultProps {
  onNavigate: (screen: Screen) => void;
  isWalletConnected: boolean;
}

export default function CreateVault({ onNavigate }: CreateVaultProps) {
  const [step, setStep] = useState(1);
  const [ownerWallet, setOwnerWallet] = useState('');
  const [heirName, setHeirName] = useState('');
  const [agent, setAgent] = useState('');

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-6">
      <Card className="w-full max-w-lg shadow">
        <CardHeader>
          <CardTitle>금고 생성</CardTitle>
          <CardDescription>
            6단계 마법사를 따라 금고를 생성하세요
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-3">
              <h2 className="font-semibold">1. 소유자 지갑 주소 입력</h2>
              <Input
                placeholder="0x123..."
                value={ownerWallet}
                onChange={e => setOwnerWallet(e.target.value)}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <h2 className="font-semibold">2. 상속인 이름</h2>
              <Input
                placeholder="홍길동"
                value={heirName}
                onChange={e => setHeirName(e.target.value)}
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <h2 className="font-semibold">3. 대리인 정보</h2>
              <Input
                placeholder="법무법인 / 미지정 가능"
                value={agent}
                onChange={e => setAgent(e.target.value)}
              />
            </div>
          )}

          {/* (임시) 나머지 단계는 UI만 */}
          {step === 4 && <p>4. 유언장 업로드 단계 (추후 구현)</p>}
          {step === 5 && <p>5. 금고 생성 설정 확인 단계 (추후 구현)</p>}
          {step === 6 && <p>6. 금고 생성 완료!</p>}
        </CardContent>

        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button variant="outline" onClick={prevStep}>
              뒤로
            </Button>
          )}
          {step < 6 && <Button onClick={nextStep}>다음</Button>}
          {step === 6 && (
            <Button
              onClick={() => onNavigate('dashboard')}
              className="bg-blue-600 text-white"
            >
              대시보드로 이동
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
