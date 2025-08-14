'use client';

import { cn } from '@/lib/utils';
import { PricingCard, PricingCardProps } from './pricing-card';
import { ReactNode } from 'react';

export interface PricingPlan extends Omit<PricingCardProps, 'actionButton'> {
  id: string;
  actionButton?: ReactNode;
}

export interface PricingTableProps {
  plans: PricingPlan[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
  containerClassName?: string;
  title?: string;
  subtitle?: string;
}

export function PricingTable({
  plans,
  columns = 3,
  className,
  containerClassName,
  title,
  subtitle,
}: PricingTableProps) {
  const gridCols = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  };

  return (
    <div className={cn('w-full', containerClassName)}>
      {(title || subtitle) && (
        <div className="mb-12 text-center">
          {title && (
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
          )}
        </div>
      )}

      <div
        className={cn(
          'grid gap-6 lg:gap-8',
          gridCols[columns],
          'grid-cols-1',
          className
        )}
      >
        {plans.map((plan) => (
          <PricingCard
            key={plan.id}
            title={plan.title}
            price={plan.price}
            currency={plan.currency}
            period={plan.period}
            description={plan.description}
            features={plan.features}
            highlighted={plan.highlighted}
            highlightText={plan.highlightText}
            actionButton={plan.actionButton}
            className={plan.className}
          />
        ))}
      </div>
    </div>
  );
}

export interface ComparisonTableProps {
  plans: PricingPlan[];
  featureCategories?: {
    name: string;
    features: {
      name: string;
      plans: Record<string, boolean | string>;
    }[];
  }[];
  className?: string;
}

export function PricingComparisonTable({
  plans,
  featureCategories = [],
  className,
}: ComparisonTableProps) {
  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-3 text-left text-sm font-medium">
              Features
            </th>
            {plans.map((plan) => (
              <th
                key={plan.id}
                className="px-4 py-3 text-center text-sm font-medium"
              >
                <div className="space-y-1">
                  <div className="font-semibold">{plan.title}</div>
                  <div className="text-2xl font-bold">
                    {typeof plan.price === 'number'
                      ? `${plan.currency || '$'}${plan.price}`
                      : plan.price}
                  </div>
                  {plan.period && (
                    <div className="text-xs text-muted-foreground">
                      {plan.period}
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {featureCategories.map((category, categoryIndex) => (
            <>
              <tr key={`category-${categoryIndex}`}>
                <td
                  colSpan={plans.length + 1}
                  className="bg-muted/50 px-4 py-2 text-sm font-semibold"
                >
                  {category.name}
                </td>
              </tr>
              {category.features.map((feature, featureIndex) => (
                <tr
                  key={`feature-${categoryIndex}-${featureIndex}`}
                  className="border-b"
                >
                  <td className="px-4 py-3 text-sm">{feature.name}</td>
                  {plans.map((plan) => (
                    <td
                      key={plan.id}
                      className="px-4 py-3 text-center text-sm"
                    >
                      {feature.plans[plan.id] === true ? (
                        <Check className="mx-auto h-5 w-5 text-primary" />
                      ) : feature.plans[plan.id] === false ? (
                        <X className="mx-auto h-5 w-5 text-muted-foreground" />
                      ) : (
                        <span>{feature.plans[plan.id]}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { Check, X } from 'lucide-react';