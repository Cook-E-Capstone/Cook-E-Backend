export interface ImageRecognitionRequest {
  image: Buffer;
}

export interface ImageRecognitionResponse {
  name: string;
  confidence: number;
  nutrition: any;
}

export interface RecipeRecommendationResponse {
  query: string;
  results: any[];
}
