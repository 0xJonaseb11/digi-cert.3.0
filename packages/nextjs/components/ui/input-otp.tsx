"use client";

import * as React from "react";
import { cn } from "../../utils/scaffold-eth/common";
import { MinusIcon } from "lucide-react";

function InputOTP({
  className,
  containerClassName,
  length = 6,
  value,
  onChange,
  ...props
}: React.ComponentProps<"div"> & {
  containerClassName?: string;
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
}) {
  const [otp, setOtp] = React.useState<string[]>(new Array(length).fill(""));
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    if (value) {
      setOtp(value.split("").slice(0, length));
    }
  }, [value, length]);

  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange?.(newOtp.join(""));

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div data-slot="input-otp" className={cn("flex items-center gap-2", containerClassName)} {...props}>
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={el => {
            inputRefs.current[index] = el;
          }}
          type="text"
          maxLength={1}
          value={digit}
          onChange={e => handleChange(index, e.target.value)}
          onKeyDown={e => handleKeyDown(index, e)}
          aria-label={`OTP digit ${index + 1}`}
          placeholder="•"
          className={cn(
            "h-9 w-9 text-center border border-input bg-background text-sm transition-all outline-none focus:ring-2 focus:ring-ring focus:border-ring",
            index === 0 ? "rounded-l-md" : "",
            index === length - 1 ? "rounded-r-md" : "",
            className,
          )}
        />
      ))}
    </div>
  );
}

function InputOTPGroup({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-group" className={cn("flex items-center gap-1", className)} {...props}>
      {children}
    </div>
  );
}

function InputOTPSlot({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-slot"
      className={cn(
        "relative flex h-9 w-9 items-center justify-center border border-input bg-background text-sm transition-all outline-none focus:ring-2 focus:ring-ring focus:border-ring",
        className,
      )}
      {...props}
    />
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
