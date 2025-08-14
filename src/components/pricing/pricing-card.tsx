'use client';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { ReactNode } from 'react';

export interface PricingCardProps {
  title: string;
  price: string | number;
  currency?: string;
  period?: string;
  description?: string;
  features: (string | { text: string; included: boolean })[];
  highlighted?: boolean;
  highlightText?: string;
  actionButton?: ReactNode;
  className?: string;
}

export function PricingCard({
  title,
  price,
  currency = '$',
  period = '/month',
  description,
  features,
  highlighted = false,
  highlightText = 'Most Popular',
  actionButton,
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-lg border p-8 shadow-sm transition-all hover:shadow-md',
        highlighted
          ? 'border-2 border-primary bg-background'
          : 'border-border bg-background',
        className
      )}
    >
      {highlighted && highlightText && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
          <span className="rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
            {highlightText}
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-2xl font-bold">{title}</h3>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="mb-6">
        <span className="text-4xl font-bold">
          {typeof price === 'number' ? `${currency}${price}` : price}
        </span>
        {period && (
          <span className="ml-1 text-muted-foreground">{period}</span>
        )}
      </div>

      <ul className="mb-8 space-y-3">
        {features.map((feature, index) => {
          const isString = typeof feature === 'string';
          const text = isString ? feature : feature.text;
          const included = isString ? true : feature.included;

          return (
            <li
              key={index}
              className={cn(
                'flex items-start gap-2',
                !included && 'text-muted-foreground line-through'
              )}
            >
              <Check
                className={cn(
                  'mt-0.5 h-4 w-4 flex-shrink-0',
                  included ? 'text-primary' : 'text-muted-foreground'
                )}
              />
              <span className="text-sm">{text}</span>
            </li>
          );
        })}
      </ul>

      {actionButton && <div className="mt-auto">{actionButton}</div>}
    </div>
  );
}