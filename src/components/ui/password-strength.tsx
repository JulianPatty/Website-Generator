"use client";

import { cn } from "@/lib/utils";
import { getPasswordStrength } from "@/lib/validations/auth";
import { Check, X } from "lucide-react";

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const { score, feedback } = getPasswordStrength(password);

  const getStrengthText = () => {
    if (score === 0) return "";
    if (score < 50) return "Weak";
    if (score < 75) return "Fair";
    if (score < 100) return "Good";
    return "Strong";
  };

  const getStrengthColor = () => {
    if (score === 0) return "bg-gray-200";
    if (score < 50) return "bg-red-500";
    if (score < 75) return "bg-yellow-500";
    if (score < 100) return "bg-blue-500";
    return "bg-green-500";
  };

  if (!password) return null;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Password strength</span>
        <span className={cn(
          "font-medium",
          score < 50 && "text-red-500",
          score >= 50 && score < 75 && "text-yellow-500",
          score >= 75 && score < 100 && "text-blue-500",
          score >= 100 && "text-green-500"
        )}>
          {getStrengthText()}
        </span>
      </div>
      
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn("h-full transition-all duration-300", getStrengthColor())}
          style={{ width: `${score}%` }}
        />
      </div>

      {feedback.length > 0 && (
        <ul className="text-xs space-y-1">
          {feedback.map((item, index) => (
            <li key={index} className="flex items-center gap-1 text-muted-foreground">
              <X className="h-3 w-3 text-red-500" />
              {item}
            </li>
          ))}
        </ul>
      )}

      {score === 100 && (
        <div className="flex items-center gap-1 text-xs text-green-600">
          <Check className="h-3 w-3" />
          Strong password!
        </div>
      )}
    </div>
  );
}