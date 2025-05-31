import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, message } from "antd";
import api from "../services/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);

  const handleSendCode = async () => {
    try {
      await api.createNewAccessCode(phone);
      message.success("Mã truy cập đã được gửi qua SMS");
      setStep(2);
    } catch {
      message.error("Lỗi khi gửi mã");
    }
  };

  const handleVerify = async () => {
    try {
      const res = await api.validateAccessCode(phone, code);
      if (res.success) {
        localStorage.setItem("phone_number", phone);
        message.success("Xác thực thành công");
          navigate("/search"); 
        // window.location.href = "/search";
      }
    } catch {
      message.error("Mã không chính xác");
    }
  };
  return (
    <div style={{ padding: 50 }}>
      <h2>Đăng nhập</h2>
      <Input
        placeholder="Nhập số điện thoại"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        disabled={step === 2}
        style={{ marginBottom: 10 }}
      />
      {step === 1 && <Button onClick={handleSendCode}>Gửi mã</Button>}

      {step === 2 && (
        <>
          <Input
            placeholder="Nhập mã truy cập"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ marginTop: 10, marginBottom: 10 }}
          />
          <Button onClick={handleVerify}>Xác nhận</Button>
        </>
      )}
    </div>
  );
}
