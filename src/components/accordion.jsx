// Adapted from Origin UI (MIT), shadcn/originui registry/default/ui/accordion.tsx.
// Plain CSS / JavaScript adaptation. See THIRD_PARTY_NOTICES.md.
import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

export function Accordion(props) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}
export function AccordionItem({ className = '', ...props }) {
  return <AccordionPrimitive.Item data-slot="accordion-item" className={`accordion-item ${className}`} {...props} />;
}
export function AccordionTrigger({ className = '', children, ...props }) {
  return <AccordionPrimitive.Header className="accordion-header"><AccordionPrimitive.Trigger data-slot="accordion-trigger" className={`accordion-trigger ${className}`} {...props}>{children}<ChevronDown size={17} className="accordion-chevron" aria-hidden="true" /></AccordionPrimitive.Trigger></AccordionPrimitive.Header>;
}
export function AccordionContent({ className = '', children, ...props }) {
  return <AccordionPrimitive.Content data-slot="accordion-content" className="accordion-content" {...props}><div className={`accordion-content-inner ${className}`}>{children}</div></AccordionPrimitive.Content>;
}
