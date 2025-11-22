import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

import { register as registerApi } from '../../api/client'; // ⭐ API 연결 추가
import type { Screen } from '../../App';

interface SignUpProps {
  onNavigate: (screen: Screen) => void;
}

export default function SignUp({ onNavigate }: SignUpProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);

    try {
      const res = await registerApi(email, password); // ⭐ 백엔드 호출
      console.log('📌 Register Response:', res);

      if (res?.success === false) {
        setErrorMsg(res.message || '회원가입 실패');
        setLoading(false);
        return;
      }

      // 회원가입 성공 → 이메일 인증 화면으로 이동
      onNavigate('email-verification');
    } catch (err: any) {
      console.error(err);
      setErrorMsg('회원가입 중 오류가 발생했습니다.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white">S</span>
              </div>
              <span className="text-blue-600">Sanmantec</span>
            </div>
          </div>
          <CardTitle className="text-center">계정 만들기</CardTitle>
          <CardDescription className="text-center">
            Web3 상속 서비스로 디지털 자산을 안전하게 보호하세요
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            {/* 오류 메시지 */}
            {errorMsg && (
              <div className="text-red-500 text-sm text-center">{errorMsg}</div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">비밀번호 확인</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? '회원가입 중...' : '회원가입'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <p className="text-sm text-center text-muted-foreground">
            상속 금고를 생성하려면 이메일 인증이 필요합니다.
          </p>
          <div className="text-sm text-center">
            이미 계정이 있으신가요?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="text-blue-600 hover:underline"
            >
              로그인
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
