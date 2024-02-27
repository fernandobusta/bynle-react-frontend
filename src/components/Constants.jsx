import {
  CalendarIcon,
  // ChartPieIcon,
  DocumentDuplicateIcon,
  // FolderIcon,
  UserGroupIcon,
  HomeIcon,
  UsersIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

export const navigation = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Clubs", href: "/clubs", icon: UsersIcon },
  // { name: "Projects", href: "#", icon: FolderIcon },
  { name: "Events", href: "/events", icon: CalendarIcon },
  {
    name: "My Tickets",
    href: "/my-tickets",
    icon: DocumentDuplicateIcon,
    current: false,
  },
  // { name: "Reports", href: "#", icon: ChartPieIcon },
  { name: "Create Club", href: "/create-club", icon: PlusCircleIcon },
  { name: "Friends", href: "/my-friends", icon: UserGroupIcon },
];

export const SITE_URL = process.env.REACT_APP_SITE_URL;
export const API_URL = process.env.REACT_APP_API_URL;

export const event_choices = [
  { value: "A", label: "Anniversary" },
  { value: "B", label: "Birthday" },
  { value: "C", label: "Charity" },
  { value: "D", label: "Dinner" },
  { value: "E", label: "Exhibition" },
  { value: "F", label: "Festival" },
  { value: "G", label: "Gathering" },
  { value: "H", label: "Hackathon" },
  { value: "I", label: "Interview" },
  { value: "J", label: "Job Fair" },
  { value: "L", label: "Lecture" },
  { value: "M", label: "Meeting" },
  { value: "N", label: "Networking" },
  { value: "O", label: "Other" },
  { value: "P", label: "Party" },
  { value: "R", label: "Rally" },
  { value: "S", label: "Seminar" },
  { value: "T", label: "Tournament" },
  { value: "V", label: "Visit" },
  { value: "W", label: "Workshop" },
  { value: "X", label: "Expo" },
];

export const ticket_status = [
  { value: "A", label: "Active" },
  { value: "C", label: "Cancelled" },
  { value: "R", label: "Refunded" },
  { value: "U", label: "Used" },
];
