import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AuthForm() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("flow", step);

    try {
      await signIn("password", formData);
    } catch (e){

      //gestione errori di email e password (non ottimale ma giusto per fornire  un feedback all'utente)
      if(e.toString().includes('InvalidAccountId')){
        alert('Qualcosa non va, indirizzo email errato')
      }else if(e.toString().includes('InvalidSecret')){
        alert('Qualcosa non va, password errata')
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">
            {step === "signIn" ? "Log In" : "Registrazione"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input input-bordered w-full pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            <div className="form-control mt-6">
              <button 
                type="submit" 
                className={`btn btn-primary w-full flex justify-center align-middle content-center`}
                disabled={isLoading}
              >
                {isLoading 
                  ? 
                  <div className="justify-center items-center">
                    <span className="loading loading-spinner loading-xs"></span>
                    </div>
                  : (step === "signIn" ? "Login" : "Registrati")
                }
              </button>
            </div>
          </form>
          <div className="divider">OR</div>
          <button
            type="button"
            className="btn btn-outline btn-secondary"
            onClick={() => setStep(step === "signIn" ? "signUp" : "signIn")}
            disabled={isLoading}
          >
            {step === "signIn" ? "Crea un account" : "Hai già un account?"}
          </button>
        </div>
      </div>
    </div>
  );
}