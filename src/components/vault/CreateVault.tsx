import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { ArrowLeft, ArrowRight, CheckCircle2, Upload, Wallet } from "lucide-react";
import type { Screen } from "../../App";
import { api } from "../../api"; // 🔥 추가됨

interface CreateVaultProps {
  onNavigate: (screen: Screen) => void;
  isWalletConnected: boolean;
}

export default function CreateVault({ onNavigate, isWalletConnected }: CreateVaultProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    ownerWallet: "",
    heirName: "",
    heirEmail: "",
    heirWallet: "",
    agentName: "",
    agentEmail: "",
    agentRelation: "",
    noAgent: false,
    willOption: "upload", // 'upload', 'family', 'none'
    agreeTerms: false,
  });

  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 🔥 백엔드 금고 생성 API 연결 추가됨
  const handleComplete = async () => {
    try {
      await api.post("/contract/submit", {
        functionName: "deposit",
        params: ["1000"], // 테스트용 값
      });

      alert("금고 생성 트랜잭션 제출 완료!");
      onNavigate("dashboard");
    } catch (err) {
      alert("금고 생성 실패");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button onClick={() => onNavigate("dashboard")} variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            대시보드로 돌아가기
          </Button>

          <h1 className="mb-2">상속 금고 생성</h1>
          <p className="text-muted-foreground">디지털 자산 상속 계획을 설정하세요</p>
        </div>

        {/* Progress Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step < currentStep
                        ? "bg-green-600 text-white"
                        : step === currentStep
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step < currentStep ? <CheckCircle2 className="w-5 h-5" /> : step}
                  </div>
                  <div className="text-xs mt-1 text-center">
                    {step === 1 && "소개"}
                    {step === 2 && "소유자"}
                    {step === 3 && "상속인"}
                    {step === 4 && "대리인"}
                    {step === 5 && "유언장"}
                    {step === 6 && "확인"}
                  </div>
                </div>

                {step < totalSteps && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step < currentStep ? "bg-green-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="shadow-lg">
          <CardContent className="p-8">
            {/* Step 1: Intro */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="mb-4">금고 생성에 오신 것을 환영합니다</h2>
                  <p className="text-muted-foreground mb-6">
                    디지털 자산을 위한 안전한 상속 금고를 생성하세요.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="mb-2">👤 소유자</h3>
                    <p className="text-sm text-muted-foreground">
                      디지털 자산의 현재 소유자입니다.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="mb-2">🎯 상속인</h3>
                    <p className="text-sm text-muted-foreground">
                      상속받을 사람입니다.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="mb-2">⚖️ 대리인 (선택사항)</h3>
                    <p className="text-sm text-muted-foreground">신뢰할 수 있는 제3자입니다.</p>
                  </div>

                  <div className="p-4 border-l-4 border-blue-600 bg-blue-50">
                    <h3 className="mb-2">📋 절차</h3>
                    <p className="text-sm text-muted-foreground">
                      사망증명서 → 유언장 → KYC → 잠금해제 → 인출
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Owner Wallet */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="mb-2">소유자 지갑 선택</h2>
                </div>

                {!isWalletConnected ? (
                  <div className="text-center py-8">
                    <Wallet className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="mb-4 text-muted-foreground">먼저 지갑을 연결해야 합니다</p>
                    <Button className="bg-blue-600 hover:bg-blue-700">지갑 연결</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Label>지갑 선택</Label>
                    <select
                      className="w-full p-3 border rounded-lg"
                      value={formData.ownerWallet}
                      onChange={(e) => setFormData({ ...formData, ownerWallet: e.target.value })}
                    >
                      <option value="">지갑 선택</option>
                      <option value="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb">
                        메인 지갑 (Ethereum)
                      </option>
                      <option value="0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063">
                        Kaia 지갑
                      </option>
                    </select>

                    {formData.ownerWallet && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 text-green-700">
                          <CheckCircle2 className="w-5 h-5" />
                          <span>지갑이 선택되었습니다</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Heir */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="mb-2">상속인 정보 입력</h2>

                <div className="space-y-4">
                  <div>
                    <Label>상속인 이름</Label>
                    <Input
                      placeholder="홍길동"
                      value={formData.heirName}
                      onChange={(e) => setFormData({ ...formData, heirName: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>상속인 이메일</Label>
                    <Input
                      type="email"
                      placeholder="hong@example.com"
                      value={formData.heirEmail}
                      onChange={(e) => setFormData({ ...formData, heirEmail: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>상속인 지갑 주소 (선택)</Label>
                    <Input
                      placeholder="0x..."
                      value={formData.heirWallet}
                      onChange={(e) => setFormData({ ...formData, heirWallet: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Agent */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="mb-2">대리인 정보</h2>

                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox
                    id="no-agent"
                    checked={formData.noAgent}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, noAgent: checked as boolean })
                    }
                  />
                  <Label>대리인 없이 진행</Label>
                </div>

                {!formData.noAgent && (
                  <div className="space-y-4">
                    <div>
                      <Label>대리인 이름</Label>
                      <Input
                        placeholder="ABC 법무법인"
                        value={formData.agentName}
                        onChange={(e) => setFormData({ ...formData, agentName: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label>대리인 이메일</Label>
                      <Input
                        type="email"
                        placeholder="contact@legalfirm.com"
                        value={formData.agentEmail}
                        onChange={(e) =>
                          setFormData({ ...formData, agentEmail: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <Label>관계/역할</Label>
                      <Input
                        placeholder="법률 대리인"
                        value={formData.agentRelation}
                        onChange={(e) =>
                          setFormData({ ...formData, agentRelation: e.target.value })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Will Upload */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="mb-2">유언장 업로드</h2>

                <div className="space-y-4">
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer">
                      <input
                        type="radio"
                        name="will-option"
                        value="upload"
                        checked={formData.willOption === "upload"}
                        onChange={(e) =>
                          setFormData({ ...formData, willOption: e.target.value })
                        }
                      />
                      <div className="flex-1">
                        <div>유언장 문서 업로드</div>
                        <div className="text-sm text-muted-foreground">
                          PDF / JPG / PNG
                        </div>
                      </div>
                    </label>

                    {formData.willOption === "upload" && (
                      <div className="ml-7 p-4 border-2 border-dashed rounded-lg text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <Button variant="outline" size="sm">
                          파일 선택
                        </Button>
                      </div>
                    )}

                    <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer">
                      <input
                        type="radio"
                        name="will-option"
                        value="family"
                        checked={formData.willOption === "family"}
                        onChange={(e) =>
                          setFormData({ ...formData, willOption: e.target.value })
                        }
                      />
                      <div className="flex-1">
                        <div>유언장 없음 (가족 상속인)</div>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer">
                      <input
                        type="radio"
                        name="will-option"
                        value="none"
                        checked={formData.willOption === "none"}
                        onChange={(e) =>
                          setFormData({ ...formData, willOption: e.target.value })
                        }
                      />
                      <div className="flex-1">
                        <div>유언장 없이 진행</div>
                        <div className="text-sm text-muted-foreground text-amber-600">
                          ⚠️ 상속 절차 복잡 가능
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Summary */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <h2 className="mb-2">검토 및 확인</h2>

                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>소유자 지갑</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <code className="text-sm">
                        {formData.ownerWallet || "선택되지 않음"}
                      </code>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>상속인 정보</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>이름: {formData.heirName || "없음"}</div>
                      <div>이메일: {formData.heirEmail || "없음"}</div>
                      <div>지갑: {formData.heirWallet || "없음"}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>대리인 정보</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {formData.noAgent ? (
                        <div>대리인 없음</div>
                      ) : (
                        <div className="space-y-2">
                          <div>이름: {formData.agentName || "없음"}</div>
                          <div>이메일: {formData.agentEmail || "없음"}</div>
                          <div>관계: {formData.agentRelation || "없음"}</div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>유언장 상태</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge
                        variant={
                          formData.willOption === "upload" ? "default" : "secondary"
                        }
                      >
                        {formData.willOption === "upload" && "유언장 업로드됨"}
                        {formData.willOption === "family" && "가족 상속인"}
                        {formData.willOption === "none" && "유언장 없음"}
                      </Badge>
                    </CardContent>
                  </Card>

                  <div className="p-4 border rounded-lg bg-blue-50">
                    <h3 className="mb-2">정책 요약</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>금고 생성에는 블록체인 트랜잭션이 필요합니다</li>
                      <li>상속인은 KYC 인증을 완료해야 합니다</li>
                      <li>사망증명서 제출 필요</li>
                      <li>유언장 검증 필요</li>
                    </ul>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agree"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, agreeTerms: checked as boolean })
                      }
                    />
                    <Label htmlFor="agree">약관 동의</Label>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button onClick={handleBack} variant="outline" disabled={currentStep === 1}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            이전
          </Button>

          {currentStep < totalSteps ? (
            <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
              다음
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={!formData.agreeTerms}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              금고 생성
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
