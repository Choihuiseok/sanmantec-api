import { useState } from 'react';
import SignUp from './components/auth/SignUp';
import EmailVerification from './components/auth/EmailVerification';
import Login from './components/auth/Login';
import ConnectWallet from './components/auth/ConnectWallet';
import Dashboard from './components/dashboard/Dashboard';
import VaultDetail from './components/vault/VaultDetail';
import CreateVault from './components/vault/CreateVault';
import SubmitDeathCertificate from './components/vault/SubmitDeathCertificate';
import UnlockAndWithdraw from './components/vault/UnlockAndWithdraw';

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
  const [walletAddress, setWalletAddress] = useState<string | null>(null); // ⭐ 지갑 주소 저장

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleLogin = (email: string) => {
    setUserEmail(email);
    if (isWalletConnected) {
      navigate('dashboard');
    } else {
      navigate('connect-wallet');
    }
  };

  // ⭐ 지갑 주소를 전달받는 함수로 변경
  const handleWalletConnect = (address: string) => {
    setWalletAddress(address);
    setIsWalletConnected(true);
    console.log('💙 Connected Wallet:', address);
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
          walletAddress={walletAddress} // ⭐ Dashboard로 지갑 주소 전달
          onNavigate={navigate}
          onWalletConnect={handleWalletConnect}
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
