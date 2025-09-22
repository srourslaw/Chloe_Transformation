import { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, Shield } from 'lucide-react';

interface PasswordProtectionProps {
  children: React.ReactNode;
}

const CORRECT_PASSWORD = 'Chloe2025!'; // You can change this password
const SESSION_KEY = 'dashboard_authenticated';

export default function PasswordProtection({ children }: PasswordProtectionProps) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already authenticated
  useEffect(() => {
    const savedAuth = sessionStorage.getItem(SESSION_KEY);
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication delay for better UX
    setTimeout(() => {
      if (password === CORRECT_PASSWORD) {
        setIsAuthenticated(true);
        sessionStorage.setItem(SESSION_KEY, 'true');
        setError('');
      } else {
        setError('Incorrect password. Please try again.');
        setPassword('');
      }
      setIsLoading(false);
    }, 800);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(SESSION_KEY);
    setPassword('');
  };

  if (isAuthenticated) {
    return (
      <div>
        {/* Logout button: left on desktop, positioned to not overlap settings on mobile */}
        <div className="fixed top-4 left-4 lg:left-4 lg:right-auto right-20 z-50">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg text-sm"
            title="Logout"
          >
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <Lock className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Chloe Transformation Dashboard
          </h1>
          <p className="text-secondary-600">
            Please enter the access password to continue
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-secondary-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-secondary-700 mb-2">
                Access Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                    error ? 'border-red-300 bg-red-50' : 'border-secondary-300'
                  }`}
                  placeholder="Enter password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <span className="inline-block w-4 h-4 text-center">⚠️</span>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !password.trim()}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                isLoading || !password.trim()
                  ? 'bg-secondary-200 text-secondary-400 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Authenticating...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Shield className="h-4 w-4" />
                  Access Dashboard
                </div>
              )}
            </button>
          </form>

          {/* Demo Hint */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-2">
              <div className="text-blue-600 mt-0.5">💡</div>
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Demo Access</p>
                <p className="text-blue-700">
                  This is a secure business intelligence dashboard.
                  Contact the administrator for access credentials.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-secondary-500">
          <p>© 2024 Chloe Transformation Project</p>
          <p className="mt-1">Secure Business Intelligence Dashboard</p>
        </div>
      </div>
    </div>
  );
}