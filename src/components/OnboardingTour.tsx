import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Joyride, { CallBackProps, STATUS, Step, ACTIONS, EVENTS } from "react-joyride";

const ONBOARDING_KEY = "dwamee_onboarding_completed";

const steps: Step[] = [
  {
    target: "body",
    content: "Welcome to Dwamee! 🎉 Let's take a quick tour to help you set up your organization. We'll guide you through creating your first Branch, Group, Place, and more.",
    placement: "center",
    disableBeacon: true,
  },
  {
    target: "[data-sidebar]",
    content: "This is your navigation sidebar. It contains all management sections organized by category: Management, Projects, and Leave & Attendance.",
    placement: "right",
    disableBeacon: true,
  },
  {
    target: "[data-tour='branches']",
    content: "Step 1: Create a Branch first. Branches represent your physical office locations (e.g., Cairo HQ, Alexandria Office). Each branch holds groups of employees.",
    placement: "right",
    disableBeacon: true,
  },
  {
    target: "[data-tour='groups']",
    content: "Step 2: Create Groups within branches. Groups organize employees into teams (e.g., Engineering, Sales, HR). Groups belong to branches.",
    placement: "right",
    disableBeacon: true,
  },
  {
    target: "[data-tour='places']",
    content: "Step 3: Set up Places. Places define geofence locations for attendance tracking—using points, polygons, or areas.",
    placement: "right",
    disableBeacon: true,
  },
  {
    target: "[data-tour='fields']",
    content: "Step 4: Configure Fields. Custom fields let you capture additional employee data tailored to your organization.",
    placement: "right",
    disableBeacon: true,
  },
  {
    target: "[data-tour='projects']",
    content: "Step 5: Create Projects to organize work. Projects contain Modules (feature groups) which contain Tasks (work items).",
    placement: "right",
    disableBeacon: true,
  },
  {
    target: "[data-tour='kanban']",
    content: "The Kanban Board visualizes task workflow. Drag tasks between columns: Pending → Planning → In Progress → Review → Finished.",
    placement: "right",
    disableBeacon: true,
  },
  {
    target: "[data-tour='leave-types']",
    content: "Configure Leave Types (Sick, Annual, etc.) with approval workflows, financial impact rules, and balance policies.",
    placement: "right",
    disableBeacon: true,
  },
  {
    target: "body",
    content: "You're all set! 🚀 Start by creating your first Branch, then add Groups, Places, and Fields. You can always revisit this tour from the Help Center.",
    placement: "center",
    disableBeacon: true,
  },
];

export default function OnboardingTour() {
  const [run, setRun] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const completed = localStorage.getItem(ONBOARDING_KEY);
    if (!completed) {
      const timer = setTimeout(() => setRun(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCallback = useCallback((data: CallBackProps) => {
    const { status, action, index, type } = data;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      localStorage.setItem(ONBOARDING_KEY, "true");
      setRun(false);
    }

    // Navigate when stepping to sidebar items
    if (type === EVENTS.STEP_AFTER && action === ACTIONS.NEXT) {
      const routeMap: Record<number, string> = {
        1: "/dashboard/branches",
        2: "/dashboard/branches",
        3: "/dashboard/groups",
        4: "/dashboard/places",
        5: "/dashboard/fields",
        6: "/dashboard/projects",
        7: "/dashboard/kanban",
        8: "/dashboard/leave-types",
      };
      const nextRoute = routeMap[index + 1];
      if (nextRoute) navigate(nextRoute);
    }
  }, [navigate]);

  if (!run) return null;

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      showProgress
      scrollToFirstStep
      disableOverlayClose
      callback={handleCallback}
      styles={{
        options: {
          primaryColor: "hsl(211, 65%, 47%)",
          zIndex: 1000,
          arrowColor: "hsl(0, 0%, 100%)",
          backgroundColor: "hsl(0, 0%, 100%)",
          textColor: "hsl(215, 25%, 15%)",
          overlayColor: "rgba(0, 0, 0, 0.5)",
        },
        buttonNext: {
          backgroundColor: "hsl(211, 65%, 47%)",
          borderRadius: "8px",
          padding: "8px 16px",
          fontSize: "14px",
        },
        buttonBack: {
          color: "hsl(215, 14%, 46%)",
          marginRight: "8px",
        },
        buttonSkip: {
          color: "hsl(215, 14%, 46%)",
          fontSize: "13px",
        },
        tooltip: {
          borderRadius: "12px",
          padding: "20px",
          fontSize: "14px",
        },
        tooltipTitle: {
          fontSize: "16px",
          fontWeight: 700,
        },
      }}
      locale={{
        back: "Back",
        close: "Close",
        last: "Finish",
        next: "Next",
        skip: "Skip Tour",
      }}
    />
  );
}

export function useResetOnboarding() {
  return () => {
    localStorage.removeItem(ONBOARDING_KEY);
    window.location.reload();
  };
}
