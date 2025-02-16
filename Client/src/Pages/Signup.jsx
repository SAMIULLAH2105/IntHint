import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signUp", {
        userName: name, 
        email,
        password,
        confirmPwd  
      });
  
      console.log("Signup successful:", response.data);
  
  
      alert("Registration successful! Please check your email for confirmation.");
      navigate('/')
    } catch (error) {
      console.error("Signup failed:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Signup failed. Please try again.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen animated-bg">
      <Card className="w-96 shadow-lg rounded-xl p-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Type password again"
                required
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
              />
            </div>
            
            <Button className="w-full mt-2" type="submit">
              Sign Up
            </Button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?
            <button
              className="text-blue-600 hover:underline ml-1"
              onClick={() => (window.location.href = "/auth/login")}
            >
              Login
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}