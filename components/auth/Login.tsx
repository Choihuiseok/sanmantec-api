import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import type { Screen } from '../../App';

interface LoginProps {
  onNavigate: (screen: Screen) => void;
  onLogin: (email: string) => void;
}

export default function Login({ onNavigate, onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email);
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
          <CardTitle className="text-center">환영합니다</CardTitle>
          <CardDescription className="text-center">
            상속 금고 관리를 위해 로그인하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-blue-600 hover:underline"
              >
                비밀번호를 잊으셨나요?
              </button>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              로그인
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center">
            계정이 없으신가요?{' '}
            <button
              onClick={() => onNavigate('signup')}
              className="text-blue-600 hover:underline"
            >
              회원가입
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}