export interface ImageRecognitionRequest {
  image: Buffer;
}

export interface ImageRecognitionResponse {
  name: string;
  confidence: number;
  nutrition: any;
}
