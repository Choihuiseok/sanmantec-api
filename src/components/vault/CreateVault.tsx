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
import { Label } from '../ui/label';
import type { Screen } from '../../App';

interface CreateVaultProps {
  onNavigate: (screen: Screen) => void;
  isWalletConnected: boolean;
}

export default function CreateVault({
  onNavigate,
  isWalletConnected,
}: CreateVaultProps) {
  const [step, setStep] = useState(1);

  // 폼 상태
  const [ownerWallet, setOwnerWallet] = useState('');
  const [heirName, setHeirName] = useState('');
  const [heirWallet, setHeirWallet] = useState('');
  const [agentName, setAgentName] = useState('');
  const [agentEmail, setAgentEmail] = useState('');
  const [willFile, setWillFile] = useState<File | null>(null);

  const next = () => setStep(s => s + 1);
  const prev = () => setStep(s => s - 1);

  const finish = () => {
    console.log('📌 금고 생성 완료');
    console.log({
      ownerWallet,
      heirName,
      heirWallet,
      agentName,
      agentEmail,
      willFile,
    });
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-6">
      <Card className="w-full max-w-2xl shadow-md">
        <CardHeader>
          <CardTitle>금고 생성</CardTitle>
          <CardDescription>6단계로 금고를 설정합니다</CardDescription>

          {/* Progress */}
          <div className="mt-4">
            <div className="text-sm mb-1">단계 {step} / 6</div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="h-2 bg-blue-600 rounded-full transition-all"
                style={{ width: `${(step / 6) * 100}%` }}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="mt-6">
          {/* -------------------- STEP 1 -------------------- */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">1. 금고 생성 소개</h2>
              <p className="text-gray-600">
                금고는 소유자 · 상속인 · 대리인 정보를 기반으로 생성됩니다.
                <br />
                모든 정보는 안전하게 암호화되어 저장됩니다.
              </p>
            </div>
          )}

          {/* -------------------- STEP 2 -------------------- */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">2. 소유자 지갑 선택</h2>

              {!isWalletConnected ? (
                <p className="text-red-500">지갑이 연결되어 있지 않습니다.</p>
              ) : (
                <div className="space-y-2">
                  <Label>소유자 지갑 주소</Label>
                  <Input
                    placeholder="0x..."
                    value={ownerWallet}
                    onChange={e => setOwnerWallet(e.target.value)}
                    required
                  />
                </div>
              )}
            </div>
          )}

          {/* -------------------- STEP 3 -------------------- */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">3. 상속인 정보 입력</h2>

              <Label>상속인 이름</Label>
              <Input
                placeholder="홍길동"
                value={heirName}
                onChange={e => setHeirName(e.target.value)}
              />

              <Label className="mt-4">상속인 지갑 주소</Label>
              <Input
                placeholder="0x..."
                value={heirWallet}
                onChange={e => setHeirWallet(e.target.value)}
              />
            </div>
          )}

          {/* -------------------- STEP 4 -------------------- */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">
                4. 대리인 정보 입력 (선택)
              </h2>

              <Label>대리인 이름</Label>
              <Input
                placeholder="법무법인 ABC 담당자"
                value={agentName}
                onChange={e => setAgentName(e.target.value)}
              />

              <Label>대리인 이메일</Label>
              <Input
                placeholder="agent@example.com"
                value={agentEmail}
                onChange={e => setAgentEmail(e.target.value)}
              />
            </div>
          )}

          {/* -------------------- STEP 5 -------------------- */}
          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">
                5. 유언장 업로드 (선택사항)
              </h2>

              <Input
                type="file"
                accept="application/pdf"
                onChange={e => setWillFile(e.target.files?.[0] || null)}
              />

              {willFile && (
                <p className="text-sm mt-2 text-blue-600">
                  업로드 완료: {willFile.name}
                </p>
              )}
            </div>
          )}

          {/* -------------------- STEP 6 -------------------- */}
          {step === 6 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">6. 검토 및 확인</h2>

              <div className="text-sm space-y-3">
                <p>
                  <strong>소유자 지갑:</strong> {ownerWallet || '입력 필요'}
                </p>
                <p>
                  <strong>상속인:</strong> {heirName || '입력 필요'}
                </p>
                <p>
                  <strong>상속인 지갑:</strong> {heirWallet || '입력 필요'}
                </p>
                <p>
                  <strong>대리인:</strong> {agentName || '없음'}
                </p>
                <p>
                  <strong>유언장:</strong>{' '}
                  {willFile ? willFile.name : '업로드 없음'}
                </p>
              </div>

              <p className="text-gray-600">
                모든 정보를 확인했다면 금고 생성을 완료하세요.
              </p>
            </div>
          )}
        </CardContent>

        {/* -------------------- STEP BUTTONS -------------------- */}
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={prev}>
              이전
            </Button>
          ) : (
            <div />
          )}

          {step < 6 ? (
            <Button onClick={next}>다음</Button>
          ) : (
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={finish}>
              금고 생성 완료
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
