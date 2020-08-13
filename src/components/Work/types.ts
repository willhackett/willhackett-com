interface WorkPropsBase {
  id: string;
  title: string;
  endDate: Date;
}

export interface ExperienceProps extends WorkPropsBase {
  startDate: Date;
  current: boolean;
  logo: {
    url: string;
  };
  workedOn: string;
}

export interface ClientLogoProps extends WorkPropsBase {
  logo: {
    url: string;
  };
}

export interface ProjectProps extends WorkPropsBase {
  preview: {
    url: string;
  };
  workedOn: string;
}
