export class MatrimonyProfile {
  id: any
  name!: string;
  date_of_birth!: string;
  age!: number;
  height!: string;
  weight!: string;
  mother_tongue!: string;
  caste!: string;
  religion!: string;
  education!: string;
  college_or_school_name!: string;
  district!: string;
  state!: string;
  nationality!: string;
  address!: string;
  image!: string;
  father_name!: string;
  mother_name!: string;
  sibling_details!: Sibling[];
  rasi!: string;
  nakshatram!: string;
  status!: {
    interested?: boolean,
    shortListed?: boolean
  }
}

export class Sibling {
  name!: string;
  age!: number;
  married!: boolean;
}
