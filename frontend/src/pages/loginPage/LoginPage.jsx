import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, message } from "antd";
import api from "../../services/api";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const isValidPhone = (phone) => /^0\d{9}$/.test(phone);

  const handleSendCode = async () => {
    if (!isValidPhone(phone)) {
      message.warning("Invalid phone number");
      return;
    }
    setLoading(true);
    try {
      await api.createNewAccessCode(phone);
      message.success("Access code sent via SMS");
      setStep(2);
    } catch {
      message.error("Failed to send code");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    try {
      const res = await api.validateAccessCode(phone, code);
      if (res.success) {
        localStorage.setItem("phone_number", phone);
        message.success("Verification successful");
        navigate("/search");
      }
    } catch {
      message.error("Incorrect code");
    }
  };

  return (
    <div className="loginPageDiv">
      <div className="loginPage">
        <h2>Log in</h2>
        <Input
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={step === 2}
          className="inputPhoneNum"
        />
        {step === 1 && (
          <Button onClick={handleSendCode} loading={loading}>
            Send Code
          </Button>
        )}

        {step === 2 && (
          <>
            <Input
              placeholder="Enter access code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="inputPhoneNum"
            />
            <Button onClick={handleVerify} loading={loading}>
              Verify
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
