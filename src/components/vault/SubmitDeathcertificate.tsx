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

import { Label } from '../ui/label';

import { ArrowLeft, UploadCloud } from 'lucide-react';
import type { Screen } from '../../App';

interface SubmitDeathCertificateProps {
  onNavigate: (screen: Screen) => void;
}

export default function SubmitDeathCertificate({
  onNavigate,
}: SubmitDeathCertificateProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-6">
      <Card className="w-full max-w-xl shadow-md">
        <CardHeader>
          <Button
            variant="ghost"
            className="flex items-center gap-2 mb-2"
            onClick={() => onNavigate('vault-detail')}
          >
            <ArrowLeft className="w-4 h-4" />
            돌아가기
          </Button>

          <CardTitle className="text-lg">사망 증명서 제출</CardTitle>
          <CardDescription>
            금고 검증을 위해 사망 증명서를 업로드해주세요.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* -------------------- 파일 업로드 -------------------- */}
          <section>
            <h2 className="text-sm font-semibold mb-2">증명서 파일 업로드</h2>

            <label className="flex flex-col items-center justify-center w-full h-40 border border-dashed border-gray-400 rounded-lg cursor-pointer bg-white hover:bg-gray-100 transition">
              <UploadCloud className="w-8 h-8 text-gray-600 mb-2" />
              <span className="text-gray-600">여기를 눌러 파일 선택</span>
              <Input type="file" className="hidden" />
            </label>
          </section>

          {/* -------------------- 제출자 정보 -------------------- */}
          <section>
            <h2 className="text-sm font-semibold mb-2">제출자 정보</h2>

            <div className="space-y-3">
              <div>
                <Label htmlFor="name">이름</Label>
                <Input id="name" placeholder="홍길동" />
              </div>

              <div>
                <Label htmlFor="relation">고인과의 관계</Label>
                <Input id="relation" placeholder="가족 / 친척 / 법적 대리인" />
              </div>
            </div>
          </section>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => onNavigate('unlock-withdraw')}
          >
            제출 완료
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
