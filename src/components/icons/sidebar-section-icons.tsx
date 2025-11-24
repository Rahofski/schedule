import { SidebarSectionCode } from '@/lib/data/codes';
import { ChartNoAxesCombined, Crown, History, MapPin, Users } from 'lucide-react';

export const SIDEBAR_SECTION_ICONS: Record<SidebarSectionCode, React.ReactElement> = {
  [SidebarSectionCode.GUIDE]: <ChartNoAxesCombined />,
  [SidebarSectionCode.TEACHERS]: <Users />,
  [SidebarSectionCode.STUDY_PLAN]: <History />,
  [SidebarSectionCode.WORKLOAD]: <MapPin />,
  [SidebarSectionCode.SCHEDULE]: <Crown />,
};
