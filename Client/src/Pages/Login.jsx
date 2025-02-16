import { useContext, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
// import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { storeContext } from "@/Store/Store";

export default function Login() {
    const navigate = useNavigate();

    const { isAuth, setIsAuth, user, setUser  } = useContext(storeContext);
    // const {isAuth} = state;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        try {
            
            const response = await axios.post(
                "http://localhost:5000/api/auth/logIn",
                { email, password },
                { withCredentials: true }  
            );

            console.log("Login successful:", response.data);

            setIsAuth(true);
            setUser(response.data.data.loggedInUser);
            
            navigate("/");
        } catch (err) {
            console.error("Login error:", err);
            setError(
                err.response?.data?.message || "Login failed. Please try again."
            );
        }
    };

    const handleResetPassword = async () => {
      try {
          const email = prompt("Enter your email:");
          if (!email) return alert("Email is required");
  
          const otpResponse = await fetch("http://localhost:5000/api/auth/sendPwdResetOTP", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
          });
  
          const otpResult = await otpResponse.json();
          if (!otpResult.success) throw new Error(otpResult.message);
  
          alert("OTP sent to your email. Check your inbox!");
  
          const otp = prompt("Enter the OTP:");
          const newPassword = prompt("Enter your new password:");
  
          if (!otp || !newPassword) return alert("All fields are required");
  
          const resetResponse = await fetch("http://localhost:5000/api/auth/resetPwd", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, otp, newPassword }),
          });
  
          const resetResult = await resetResponse.json();
          if (!resetResult.success) throw new Error(resetResult.message);
  
          alert("Password reset successful! You can now log in with your new password.");
          navigate('/')
      } catch (error) {
          alert(error.message);
      }
  };

    return (
        <div className="flex items-center justify-center min-h-screen animated-bg">
            <Card className="w-96 shadow-lg rounded-xl p-6">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-semibold">
                        Login
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Your email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Your password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button className="w-full mt-2" type="submit">
                            Login
                        </Button>
                    </form>

                    <p className="text-center text-sm mt-4">
                        Don't have an account?
                        <button
                            className="text-blue-600 hover:underline ml-1"
                            onClick={() =>
                                (window.location.href = "/auth/register")
                            }
                        >
                            Register
                        </button>
                    </p>
                    <p className="text-center text-sm mt-0">
                        Forget Password?
                        <button
                            className="text-blue-600 hover:underline ml-1"
                            onClick={() => handleResetPassword()}
                        >
                            Reset Password
                        </button>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
