import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { ArrowLeft, Upload, CheckCircle2, ArrowRight } from 'lucide-react';
import type { Screen } from '../../App';

interface SubmitDeathCertificateProps {
  onNavigate: (screen: Screen) => void;
}

export default function SubmitDeathCertificate({ onNavigate }: SubmitDeathCertificateProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    contact: '',
    file: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            onClick={() => onNavigate('dashboard')}
            variant="ghost"
            size="sm"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            대시보드로 돌아가기
          </Button>

          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <CardTitle>사망증명서 제출 완료</CardTitle>
              <CardDescription>
                문서가 성공적으로 업로드되었으며 검토 중입니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="mb-2">다음 단계</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600">1.</span>
                    <span>문서 검증 (영업일 기준 2-5일)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600">2.</span>
                    <span>유언장 검증 (해당되는 경우)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600">3.</span>
                    <span>상속인 KYC 인증 필요</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600">4.</span>
                    <span>금고 잠금해제 및 자산 이전</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3>제출된 정보</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">제출자:</span>
                    <span>{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">관계:</span>
                    <span>{formData.relationship}</span>
                  </div>
                  {formData.contact && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">연락처:</span>
                      <span>{formData.contact}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">상태:</span>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      검토중
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => onNavigate('vault-detail')} variant="outline" className="flex-1">
                  금고 상세보기
                </Button>
                <Button onClick={() => onNavigate('dashboard')} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  대시보드로 돌아가기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          onClick={() => onNavigate('vault-detail')}
          variant="ghost"
          size="sm"
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          금고로 돌아가기
        </Button>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>사망증명서 제출</CardTitle>
            <CardDescription>
              상속 절차를 시작하기 위해 필요한 서류를 업로드하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="file">사망증명서</Label>
                  <div className="mt-2 p-6 border-2 border-dashed rounded-lg text-center hover:bg-gray-50 cursor-pointer">
                    <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                    <div className="mb-2">
                      <Label htmlFor="file" className="cursor-pointer text-blue-600 hover:underline">
                        파일 선택
                      </Label>
                      <Input
                        id="file"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      PDF, JPG 또는 PNG (최대 10MB)
                    </p>
                    {formData.file && (
                      <div className="mt-3 text-sm text-green-600">
                        ✓ {formData.file.name}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="name">제출자 이름</Label>
                  <Input
                    id="name"
                    placeholder="전체 이름"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="relationship">소유자와의 관계</Label>
                  <Input
                    id="relationship"
                    placeholder="예: 아들, 딸, 법률 대리인"
                    value={formData.relationship}
                    onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contact">연락처 정보 (선택사항)</Label>
                  <Input
                    id="contact"
                    placeholder="이메일 또는 전화번호"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    추가 검증이 필요한 경우 연락드릴 수 있습니다
                  </p>
                </div>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h3 className="mb-2 text-amber-900">중요 사항</h3>
                <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
                  <li>제출된 모든 서류는 법무팀에서 검증합니다</li>
                  <li>허위 또는 사기성 제출은 법적 조치를 받을 수 있습니다</li>
                  <li>처리는 일반적으로 영업일 기준 2-5일이 소요됩니다</li>
                </ul>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                서류 제출
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}