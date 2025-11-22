import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Mail } from 'lucide-react';
import type { Screen } from '@/App';

interface EmailVerificationProps {
  onNavigate: (screen: Screen) => void;
}

export default function EmailVerification({
  onNavigate,
}: EmailVerificationProps) {
  const handleResend = () => {
    // TODO: 실제 이메일 재전송 API
    alert('인증 이메일을 다시 보냈습니다!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-6">
      <Card className="w-full max-w-md shadow-lg border border-blue-100">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <CardTitle className="text-center">이메일 인증</CardTitle>

          <CardDescription className="text-center text-muted-foreground">
            계정을 활성화하려면 이메일에 전송된 인증 링크를 클릭하세요.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-center text-sm text-muted-foreground leading-6">
            인증 메일이 도착하지 않았다면 아래 버튼을 눌러 다시 보내실 수
            있습니다.
          </p>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3">
          <Button variant="outline" className="w-full" onClick={handleResend}>
            인증 이메일 재전송
          </Button>
          <Button
            variant="ghost"
            className="w-full text-blue-600"
            onClick={() => onNavigate('login')}
          >
            로그인으로 돌아가기
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
