export interface Review {
  id: string;
  placeName: string;
  placeType: string;
  overallRating: number;
  description: string;
  author: string;
  date: Date;
  accessibilityFeatures: {
    wheelchairAccess: boolean;
    disabledParking: boolean;
    clearSignage: boolean;
    audioSystems: boolean;
    adaptedServices: boolean;
    accessibleLocation: boolean;
  };
}

export interface Category {
  id: string;
  label: string;
}
