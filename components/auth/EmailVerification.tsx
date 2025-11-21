import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Mail } from 'lucide-react';
import type { Screen } from '../../App';

interface EmailVerificationProps {
  onNavigate: (screen: Screen) => void;
}

export default function EmailVerification({ onNavigate }: EmailVerificationProps) {
  const handleResend = () => {
    // Handle resend logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-center">이메일 인증</CardTitle>
          <CardDescription className="text-center">
            계속하려면 이메일을 인증해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-center text-muted-foreground">
            이메일 주소로 인증 링크를 발송했습니다. 링크를 클릭하여 계정을 활성화하세요.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            onClick={handleResend}
            variant="outline" 
            className="w-full"
          >
            이메일 재전송
          </Button>
          <Button 
            onClick={() => onNavigate('login')}
            variant="ghost" 
            className="w-full"
          >
            로그인으로 돌아가기
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}