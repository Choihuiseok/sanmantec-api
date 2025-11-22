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
import { Upload, FileText, CheckCircle, ArrowLeft } from 'lucide-react';
import type { Screen } from '../../App';

interface SubmitDeathCertificateProps {
  onNavigate: (screen: Screen) => void;
}

export default function SubmitDeathCertificate({
  onNavigate,
}: SubmitDeathCertificateProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [submitterName, setSubmitterName] = useState('');
  const [relation, setRelation] = useState('');
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setUploadedFile(file);
  };

  const handleSubmit = () => {
    if (!uploadedFile || !submitterName || !relation || !contact) return;
    setSubmitted(true);
  };

  // --------------------- 제출 완료 화면 ---------------------
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <Card className="w-full max-w-md shadow-md">
          <CardHeader className="flex items-center flex-col gap-2">
            <CheckCircle className="w-12 h-12 text-green-600" />
            <CardTitle className="text-xl">제출 완료</CardTitle>
            <CardDescription>
              사망증명서가 성공적으로 제출되었습니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center text-gray-600">
            금고 관리자가 서류를 검토한 후 다음 단계로 진행됩니다.
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button
              className="bg-blue-600 hover:bg-blue-700 w-full"
              onClick={() => onNavigate('vault-detail')}
            >
              금고 상세로 돌아가기
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => onNavigate('dashboard')}
            >
              대시보드로 이동
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // --------------------- 기본 제출 화면 ---------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-lg shadow-md">
        <CardHeader>
          <Button
            variant="ghost"
            className="flex items-center gap-2 mb-2"
            onClick={() => onNavigate('vault-detail')}
          >
            <ArrowLeft className="w-4 h-4" />
            돌아가기
          </Button>

          <CardTitle>사망증명서 제출</CardTitle>
          <CardDescription>
            금고 상속 절차를 진행하기 위해 필요한 서류를 제출하세요.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* ---------------- 파일 업로드 ---------------- */}
          <section>
            <Label className="font-medium">사망증명서 파일</Label>
            <div className="mt-2 p-6 border rounded-md bg-white flex flex-col items-center justify-center gap-3">
              <Upload className="w-8 h-8 text-gray-500" />
              <p className="text-gray-600 text-sm">
                PDF 또는 이미지 파일을 업로드하세요
              </p>

              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
              />

              {uploadedFile && (
                <div className="flex items-center gap-2 mt-2 text-sm text-blue-600">
                  <FileText className="w-4 h-4" />
                  {uploadedFile.name}
                </div>
              )}
            </div>
          </section>

          {/* ---------------- 제출자 정보 ---------------- */}
          <section className="space-y-4">
            <div className="space-y-2">
              <Label>제출자 이름</Label>
              <Input
                placeholder="홍길동"
                value={submitterName}
                onChange={e => setSubmitterName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>고인과의 관계</Label>
              <Input
                placeholder="가족 / 지명된 대리인 등"
                value={relation}
                onChange={e => setRelation(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>연락처</Label>
              <Input
                placeholder="010-0000-0000"
                value={contact}
                onChange={e => setContact(e.target.value)}
              />
            </div>
          </section>
        </CardContent>

        <CardFooter>
          <Button
            className="bg-blue-600 hover:bg-blue-700 w-full"
            onClick={handleSubmit}
            disabled={!uploadedFile || !submitterName || !relation || !contact}
          >
            서류 제출하기
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
