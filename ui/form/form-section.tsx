import { ComponentType, SVGProps } from 'react';

interface InfoCardProps {
   icon: ComponentType<SVGProps<SVGSVGElement>>;
   title: string;
   children?: React.ReactNode;
}

export default function FormSection({ icon: Icon, title, children }: InfoCardProps) {
   return (
      <div className="flex flex-col">
         <div className="flex flex-row items-center text-secondary">
            <Icon className="mr-2 h-6 w-6" />
            <h3 className="text-lg font-medium text-secondary">{title}</h3>
         </div>
         <div className="text-base text-default-500">{children}</div>
      </div>
   );
}
