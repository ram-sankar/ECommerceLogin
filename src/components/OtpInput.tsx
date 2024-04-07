import React, { useState, useRef, ChangeEvent, RefObject } from 'react';

interface OtpInputProps {
  length: number;
  onChange: (otpValue: string) => void;
}

const OtpInput = (props: OtpInputProps) => {
  const [otp, setOtp] = useState<string[]>(Array(props.length).fill(''));
  const otpInputs: RefObject<HTMLInputElement>[] = Array.from({ length: props.length }, () => useRef(null));

  const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const newOtp = [...otp];
    newOtp[index] = event.target.value;

    setOtp(newOtp);

    // Move to the next input field automatically
    if (event.target.value !== '' && index < otp.length - 1) {
      otpInputs[index + 1]?.current?.focus();
    }

    const combinedOtp = newOtp.join('');
    props.onChange(combinedOtp);
  };

  return (
    <div>
        <div className="flex justify-center items-center space-x-4">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(index, e)}
              ref={otpInputs[index]}
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          ))}
        </div>
    </div>
  );
};

export default OtpInput;
