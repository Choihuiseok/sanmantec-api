import { useState } from 'react';

import SignUp from '@/components/auth/SignUp';
import EmailVerification from '@/components/auth/EmailVerification';
import Login from '@/components/auth/Login';
import ConnectWallet from '@/components/auth/ConnectWallet';

import Dashboard from '@/components/dashboard/Dashboard';

import VaultDetail from '@/components/vault/VaultDetail';
import CreateVault from '@/components/vault/CreateVault';
import SubmitDeathCertificate from '@/components/vault/SubmitDeathCertificate';
import UnlockAndWithdraw from '@/components/vault/UnlockAndWithdraw';

export type Screen =
  | 'signup'
  | 'email-verification'
  | 'login'
  | 'connect-wallet'
  | 'dashboard'
  | 'vault-detail'
  | 'create-vault'
  | 'submit-death-certificate'
  | 'unlock-withdraw';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const navigate = (screen: Screen) => setCurrentScreen(screen);

  /* 로그인 처리 */
  const handleLogin = (email: string) => {
    setUserEmail(email);
    if (isWalletConnected) navigate('dashboard');
    else navigate('connect-wallet');
  };

  /* 지갑 연결 처리 */
  const handleWalletConnect = (address: string) => {
    setWalletAddress(address);
    setIsWalletConnected(true);
    console.log('지갑 연결됨:', address);

    navigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-white">
      {currentScreen === 'signup' && <SignUp onNavigate={navigate} />}

      {currentScreen === 'email-verification' && (
        <EmailVerification onNavigate={navigate} />
      )}

      {currentScreen === 'login' && (
        <Login onNavigate={navigate} onLogin={handleLogin} />
      )}

      {currentScreen === 'connect-wallet' && (
        <ConnectWallet onConnect={handleWalletConnect} />
      )}

      {currentScreen === 'dashboard' && (
        <Dashboard
          userEmail={userEmail}
          isWalletConnected={isWalletConnected}
          walletAddress={walletAddress}
          onNavigate={navigate}
          onWalletConnect={() => navigate('connect-wallet')}
        />
      )}

      {currentScreen === 'vault-detail' && (
        <VaultDetail onNavigate={navigate} />
      )}

      {currentScreen === 'create-vault' && (
        <CreateVault
          onNavigate={navigate}
          isWalletConnected={isWalletConnected}
        />
      )}

      {currentScreen === 'submit-death-certificate' && (
        <SubmitDeathCertificate onNavigate={navigate} />
      )}

      {currentScreen === 'unlock-withdraw' && (
        <UnlockAndWithdraw onNavigate={navigate} />
      )}
    </div>
  );
}
